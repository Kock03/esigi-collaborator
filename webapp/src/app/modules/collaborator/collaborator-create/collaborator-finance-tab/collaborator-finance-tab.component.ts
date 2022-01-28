import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

export interface finance {
  dateInclusion: string;
  contractType: string,
  reason: string;
  value: string;
}



@Component({
  selector: 'app-collaborator-finance-tab',
  templateUrl: './collaborator-finance-tab.component.html',
  styleUrls: ['./collaborator-finance-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorFinanceTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('financeTable') financeTable!: MatTable<any>;

  displayedColumns: string[] = ['data', 'type', 'reason', 'value', 'monthlyValue', 'icon'];
 
  financials: finance[] = [
    {
      dateInclusion: '',
      contractType: '',
      reason: 'Contratação',
      value: '',
    },
  ];


  selectedIndex = 0;

  financeForm!: FormGroup;

  index: any = null;
  Finance: any;

  get financeArray() {
    return this.collaboratorForm.controls['Financials'] as FormArray;
  }

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initForm();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CollaboratorFinanceDialog, {
      width: '500px',
      height: '620px',
    });

    dialogRef.afterClosed().subscribe((finance) => {
      if(finance){
        this.financeArray.insert(0, this.fb.group(finance));
        this.financeTable.renderRows();
      }
    });
  }

  next() {
    this.onChange.next(true);
  }

  initForm(): void {
    this.financeForm = this.fb.group({
      dateInclusion: ['08/11/2021'],
      contractType: [1],
      reason: ['Contratação'],
      value: ['340000'],
    });
  }


  saveFinance() {
    const data = this.financeForm.getRawValue();
    this.financeArray.insert(0, this.fb.group(data));
    this.financeTable.renderRows();
    this.financeForm.reset();
  }

  getFinance(financeSelected: any, index: number) {
    const dialogRef = this.dialog.open(CollaboratorFinanceDialog, {
      width: '500px',
      height: '620px',
      data: { financeSelected },

    });

    this.index = index;
    dialogRef.afterClosed().subscribe((finance) => {
      this.financeArray.controls[this.index].setValue(finance);
    });

  }

  deleteFinance(index: number) {
    this.financeArray.removeAt(index);
  }
}

@Component({
  selector: 'collaborator-finance-dialog',
  templateUrl: 'collaborator-finance-dialog.html',
})
export class CollaboratorFinanceDialog{
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  financeForm!: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<CollaboratorFinanceDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { financeSelected: any}
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.financeForm = this.fb.group({
      dateInclusion: ['08/11/2021'],
      contractType: [1],
      reason: ['Contratação'],
      value: ['340000'],
    });
    if (this.data.financeSelected) {
      this.financeForm.patchValue(this.data.financeSelected)
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.financeForm.value);
  }
}
