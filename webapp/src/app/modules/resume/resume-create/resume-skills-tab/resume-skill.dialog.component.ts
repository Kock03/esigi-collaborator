import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'resume-skill-dialog',
  templateUrl: 'resume-skill-dialog.html',
  styleUrls: ['./resume-skills-tab.component.scss'],
})
export class ResumeSkillDialog {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  skillForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ResumeSkillDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.skillForm = this.fb.group({
      technology: [null, [Validators.required, Validators.maxLength(50)]],
      seniority: [null, Validators.required],
      yearsExperience: [null, [Validators.required, Validators.maxLength(2)]],
      currentPosition: [null, Validators.required],
    });
    if (this.data) {
      this.skillForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    const data = this.skillForm.getRawValue();
    this.dialogRef.close(data);
  }
}
