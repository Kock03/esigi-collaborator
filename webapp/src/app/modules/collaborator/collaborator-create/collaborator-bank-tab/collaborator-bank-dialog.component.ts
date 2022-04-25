import {
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'collaborator-bank-dialog',
  templateUrl: 'collaborator-bank-dialog.html',
  styleUrls: ['./collaborator-bank-tab.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CollaboratorBankDialog {
  @Input('form') collaboratorForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  bankForm!: FormGroup;
  collaborator!: any;

  constructor(
    public dialogRef: MatDialogRef<CollaboratorBankDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.bankForm = this.fb.group({
      bank: [null, [Validators.required, Validators.maxLength(50)]],
      agency: [null, [Validators.required, Validators.maxLength(4)]],
      accountType: [null, Validators.required],
      accountNumber: [null, [Validators.required, Validators.maxLength(5)]],
      digit: [null, Validators.required],
      bankAccountDigit: [null, [Validators.required, Validators.maxLength(1)]],
      status: [null, Validators.required],
    });

    if (this.data) {
      this.bankForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    const data = this.bankForm.getRawValue();
    if (!data.status) {
      data.status = false;
    }
    this.dialogRef.close(data);
  }
}
