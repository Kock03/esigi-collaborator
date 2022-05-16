import { formatDate } from '@angular/common';
import {
  Injectable,
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { CollaboratorDependentsProvider } from 'src/providers/collaborator-providers/collaborator-dependents.provider';

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
  selector: 'collaborator-dependents-dialog',
  templateUrl: 'collaborator-dependents-dialog.html',
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class CollaboratorDependentsDialog {
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  dependentForm!: FormGroup;
  Date: any;
  collaboratorId!: string | null;
  method!: string | null;
  dependentId!: string | null;
  constructor(
    public dialogRef: MatDialogRef<CollaboratorDependentsDialog>,
    private fb: FormBuilder,
    private collaboratorDependentsProvider: CollaboratorDependentsProvider,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.method = sessionStorage.getItem('method')!;
    this.collaboratorId = sessionStorage.getItem('collaborator_id')!;
    this.initForm();
  }

  initForm(): void {
    this.dependentForm = this.fb.group({
      type: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      gender: [null, Validators.required],
      cpf: [null, [DocumentValidator.isValidCpf(), Validators.required]],
      birthDate: [null, Validators.required],
      ddi: [null, Validators.required],
      ddd: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      Collaborator: { id: this.collaboratorId },
    });
    if (this.data) {
      this.dependentForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
    sessionStorage.removeItem('dependent_id');
    sessionStorage.removeItem('method');
    console.log(this.dependentForm)
  }

 async save() {
    const data = this.dependentForm.getRawValue();
    if (this.method === 'add') {
      try {
        const dependent = await this.collaboratorDependentsProvider.store(data);
        sessionStorage.setItem('dependent_id', dependent.id);
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
    if (this.method === 'edit') {
      try {
        this.dependentId = sessionStorage.getItem('dependent_id');
        const updateDependent = await this.collaboratorDependentsProvider.update(
          this.dependentId,
          data
        );
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
  }
}
