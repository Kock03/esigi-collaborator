import { Component, Input, Output, EventEmitter, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'resume-education-dialog',
    templateUrl: 'resume-education-dialog.html',
    styleUrls: ['./resume-education-tab.component.scss'],
  })
  export class ResumeEducationDialog {
    @Input('form') resumeForm!: FormGroup;
    @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  
    educationForm!: FormGroup;
  
    constructor(
      public dialogRef: MatDialogRef<ResumeEducationDialog>,
      private fb: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: { educationSelected: any }
    ) {}
  
    ngOnInit(): void {
      this.initForm();
    }
  
    initForm(): void {
      this.educationForm = this.fb.group({
        schooling: [1, Validators.required],
        situation: [1, Validators.required],
        course: [
          'Engenharia de Software',
          [Validators.required, Validators.maxLength(100)],
        ],
        institution: ['FURB', [Validators.required, Validators.maxLength(100)]],
      });
      if (this.data && this.data.educationSelected) {
        this.educationForm.patchValue(this.data.educationSelected);
      }
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    save() {
      this.dialogRef.close(this.educationForm.getRawValue());
    }
  }
  