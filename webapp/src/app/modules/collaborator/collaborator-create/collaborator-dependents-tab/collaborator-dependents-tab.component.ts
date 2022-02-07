import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  encapsulation: ViewEncapsulation.None
})
export class CollaboratorDependentsTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('dependentTable') dependentTable!: MatTable<any>;

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

  dependents: Dependent[] = [
    {
      type: 'string',
      firstName: 'string',
      lastName: 'string',
      gender: 'string',
      cpf: 'string',
      birthDate: 'string',
      ddi: 'string',
      ddd: 'string',
      phoneNumber: 'string',
      email: 'string',
    },
  ];

  selectedIndex = 0;

  dependentForm!: FormGroup;

  index: any = null;
  Dependent: any;

  get dependentArray() {
    return this.collaboratorForm.controls['Dependents'] as FormArray;
  }

  constructor(private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initForm();
  }
  openDialog() {
    const dialogRef = this.dialog.open(CollaboradorDependentsDialog, {
      width: '500px',
      height: '650px',
    });

    dialogRef.afterClosed().subscribe((dependents) => {
      if (dependents) {
        this.dependentArray.insert(0, this.fb.group(dependents));
        this.dependentTable.renderRows();
      }
    });
  }

  initForm(): void {
    this.dependentForm = this.fb.group({
      type: ['Banco do Brasil', Validators.required],
      firstName: ['5464645', Validators.required],
      lastName: ['Conta Corrente', Validators.required],
      gender: ['4365634', Validators.required],
      cpf: ['4', Validators.required],
      birthDate: ['4', Validators.required],
      ddi: ['4', Validators.required],
      ddd: ['4', Validators.required],
      phoneNumber: ['4', Validators.required],
      email: ['4', Validators.required],
    });
  }

  next() {
    this.onChange.next(true);
  }

  saveDependents() {
    const data = this.dependentForm.getRawValue();
    this.dependentArray.insert(0, this.fb.group(data));
    this.dependentTable.renderRows();
    this.dependentForm.reset();
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

@Component({
  selector: 'collaborator-dependents-dialog',
  templateUrl: 'collaborator-dependents-dialog.html',
})
export class CollaboradorDependentsDialog {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  dependentForm!: FormGroup;

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
