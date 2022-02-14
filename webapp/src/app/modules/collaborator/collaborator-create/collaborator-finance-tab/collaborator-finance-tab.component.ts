import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
} from '@angular/material/core';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { MatTable } from '@angular/material/table';

export interface finance {
  dateInclusion: string;
  contractType: string;
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

  displayedColumns: string[] = [
    'data',
    'type',
    'reason',
    'value',
    'monthlyValue',
    'icon',
  ];

  data: [] = [];

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
    this.data = this.financeArray.value;
  }

  openDialog() {
    const dialogRef = this.dialog.open(CollaboratorFinanceDialog, {
      width: '500px',
      height: '550px',
    });

    dialogRef.afterClosed().subscribe((finance) => {
      if (finance) {
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
      dateInclusion: [''],
      contractType: [],
      reason: [],
      value: [''],
    });
  }

  getFinance(financeSelected: any, index: number) {
    const dialogRef = this.dialog.open(CollaboratorFinanceDialog, {
      width: '500px',
      height: '550px',
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

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'numeric', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'numeric', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'numeric' },
  },
};

@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MM-yyyy', this.locale);
    } else {
      return date.toDateString();
    }
  }
}
@Component({
  selector: 'collaborator-finance-dialog',
  templateUrl: 'collaborator-finance-dialog.html',
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class CollaboratorFinanceDialog {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  financeForm!: FormGroup;

  Date: any;

  constructor(
    public dialogRef: MatDialogRef<CollaboratorFinanceDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { financeSelected: any }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.financeForm = this.fb.group({
      dateInclusion: ['', Validators.required],
      contractType: [1, Validators.required],
      reason: [1, Validators.required],
      value: ['3400000', Validators.required],
      payday: ['2004-06-12', Validators.required],
    });
    if (this.data && this.data.financeSelected) {
      this.financeForm.patchValue(this.data.financeSelected);

      this.financeForm.patchValue(this.data.financeSelected);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async save() {
    this.dialogRef.close(this.financeForm.getRawValue());
  }
}
