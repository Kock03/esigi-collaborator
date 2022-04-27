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
  constructor(
    public dialogRef: MatDialogRef<CollaboratorDependentsDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
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
    });
    if (this.data) {
      this.dependentForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    const data = this.dependentForm.getRawValue();
    this.dialogRef.close(data);
  }
}
