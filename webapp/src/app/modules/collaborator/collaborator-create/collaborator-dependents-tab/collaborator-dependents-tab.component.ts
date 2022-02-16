import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, Injectable, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DocumentValidator } from 'src/app/validators/document.validator';

export interface Dependent {
  type: string;
  firstName: string;
  lastName: string;
  gender: string;
  cpf: string;
  birthDate: string;
  ddi: string;
  ddd: string;
  phoneNumber: string;
  email: string;
}

@Component({
  selector: 'app-collaborator-dependents-tab',
  templateUrl: './collaborator-dependents-tab.component.html',
  styleUrls: ['./collaborator-dependents-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorDependentsTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('dependentTable') dependentTable!: MatTable<any>;

  date: any;

  displayedDependents: string[] = [
    'type',
    'firstName',
    'gender',
    'cpf',
    'birthDate',
    'phoneNumber',
    'email',
    'icon'
  ];


  data: [] = [];
  dependentForm!: FormGroup;

  index: any = null;
  Dependent: any;

  get dependentArray() {
    return this.collaboratorForm.controls['Dependents'] as FormArray;
  }

  constructor(private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.collaboratorForm.valueChanges.subscribe((res) => {
      console.log(res);

      this.data = this.dependentArray.value;
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(CollaboradorDependentsDialog, {
      width: '500px',
      height: '650px',
    });

    dialogRef.afterClosed().subscribe((dependents) => {
      if (dependents) {
        if (!this.dependentArray.controls[0].value) {
          this.dependentArray.controls[0].patchValue(dependents);
        } else {
          this.dependentArray.insert(0, this.fb.group(dependents));
        }
        this.dependentTable.renderRows();
      }
    });
  }


  next() {
    this.onChange.next(true);
  }


  getDependents(dependentsSelected: any, index: number) {
    const dialogRef = this.dialog.open(CollaboradorDependentsDialog, {
      width: '500px',
      height: '650px',
      data: { dependentsSelected },

    });
    this.index = index;
    dialogRef.afterClosed().subscribe((dependents) => {
      this.dependentArray.controls[this.index].setValue(dependents);
    });

  }

  deleteDependents(index: number) {
    this.dependentArray.removeAt(index);
  }

}

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'numeric', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'numeric', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'numeric' }
  }
};

@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MM-yyyy', this.locale);;
    } else {
      return date.toDateString();
    }
  }
}
@Component({
  selector: 'collaborator-dependents-dialog',
  templateUrl: 'collaborator-dependents-dialog.html',
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
  ]
})
export class CollaboradorDependentsDialog {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  dependentForm!: FormGroup;
  Date: any;
  constructor(
    public dialogRef: MatDialogRef<CollaboradorDependentsDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { dependentsSelected: any }
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.dependentForm = this.fb.group({
      type: [1, Validators.required],
      firstName: ['alanzoka', Validators.required],
      lastName: ['brazilien', Validators.required],
      gender: [2, Validators.required],
      cpf: ['10100756913', [DocumentValidator.isValidCpf(), Validators.required]],
      birthDate: ['02/05/004', Validators.required],
      ddi: ['55', Validators.required],
      ddd: ['47', Validators.required],
      phoneNumber: ['992173407', Validators.required],
      email: ['alan@gmail.com', [Validators.required, Validators.email]],
    });
    if (this.data && this.data.dependentsSelected) {
      this.dependentForm.patchValue(this.data.dependentsSelected)
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.dependentForm.getRawValue());
  }

}
