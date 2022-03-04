import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.educationForm = this.fb.group({
      schooling: [null, Validators.required],
      situation: [null, Validators.required],

      course: [null, [Validators.required, Validators.maxLength(100)]],

      institution: [null, [Validators.required, Validators.maxLength(100)]],
    });
    if (this.data) {
      this.educationForm.patchValue(this.data);
    }
  }

  ngAfterViewInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    const data = this.educationForm.getRawValue();
    this.dialogRef.close(data);
  }
}
