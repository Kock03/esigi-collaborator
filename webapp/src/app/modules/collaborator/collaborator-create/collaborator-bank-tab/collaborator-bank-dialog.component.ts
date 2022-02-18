import { Component, Input, Output, EventEmitter, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'collaborator-bank-dialog',
    templateUrl: 'collaborator-bank-dialog.html',
  })
  export class CollaboratorBankDialog {
    @Input('form') collaboratorForm!: FormGroup;
    @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  
    bankForm!: FormGroup;
  
    constructor(
      public dialogRef: MatDialogRef<CollaboratorBankDialog>,
      private fb: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: { bankSelected: any }
    ) {}
  
    ngOnInit(): void {
      this.initForm();
    }
  
    initForm(): void {
      this.bankForm = this.fb.group({
        bank: ['Bradesco', [Validators.required, Validators.maxLength(50)]],
        agency: ['1111', [Validators.required, Validators.maxLength(4)]],
        accountType: [1, Validators.required],
        accountNumber: ['11111', [Validators.required, Validators.maxLength(5)]],
        digit: ['1', [Validators.required, Validators.maxLength(1)]],
        bankAccountDigit: ['1', [Validators.required, Validators.maxLength(1)]],
      });
      if (this.data && this.data.bankSelected) {
        this.bankForm.patchValue(this.data.bankSelected);
      }
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    save() {
      this.dialogRef.close(this.bankForm.getRawValue());
    }
  }
  