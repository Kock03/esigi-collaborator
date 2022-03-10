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
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  financeForm!: FormGroup;

  Date: any;

  constructor(
    public dialogRef: MatDialogRef<CollaboratorFinanceDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.financeForm = this.fb.group({
      id: [null],
      dateInclusion: [null, Validators.required],
      contractType: [null, Validators.required],
      reason: [null, Validators.required],
      value: [null, Validators.required],
      payday: [null, Validators.required],
    });
    if (this.data) {
      this.financeForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async save() {
    const data = this.financeForm.getRawValue();
    this.dialogRef.close(data);
  }
}
