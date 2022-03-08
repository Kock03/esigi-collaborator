import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'resume-dialog-experience',
  templateUrl: 'resume-dialog-experience.html',
  styleUrls: ['./resume-experience-tab.component.scss'],
})
export class ResumeDialogExperience {
  @Input('form') resumeForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  experienceForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ResumeDialogExperience>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.experienceForm = this.fb.group({
      office: [null, Validators.required],
      companyName: [null, Validators.required],
      locality: [null],
      active: [false],
      startMonth: [null, Validators.required],
      startYear: [null, Validators.required],
      terminusMonth: [null, Validators.required],
      terminusYear: [null, Validators.required],
      sector: [null, Validators.required],
      description: [null, Validators.required],
    });

    if (this.data) {
      this.experienceForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async saveExperience() {
    const data = this.experienceForm.getRawValue();
    this.dialogRef.close(data);
  }
}
