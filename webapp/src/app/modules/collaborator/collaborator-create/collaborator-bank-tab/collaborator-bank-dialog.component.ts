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
      @Inject(MAT_DIALOG_DATA) public data: { bankForm: FormGroup}
    ) {}
  
    ngOnInit(): void {
      this.initForm();
    }
  
    initForm(): void {
      this.bankForm = this.data.bankForm
     
      
      if (this.data && this.data.bankForm) {
        this.bankForm.patchValue(this.data.bankForm);
      }
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    save() {
      this.dialogRef.close(this.bankForm.getRawValue());
    }
  }
  