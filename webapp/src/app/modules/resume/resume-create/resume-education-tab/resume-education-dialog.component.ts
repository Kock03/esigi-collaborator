import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResumeEducationProvider } from 'src/providers/resume-providers/resume-education.provider';

@Component({
  selector: 'resume-education-dialog',
  templateUrl: 'resume-education-dialog.html',
  styleUrls: ['./resume-education-tab.component.scss'],
})
export class ResumeEducationDialog {
  @Input('form') resumeForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  educationForm!: FormGroup;
  method!: string;
  resumeId!: string | null;
  educationId!: string | null;

  constructor(
    public dialogRef: MatDialogRef<ResumeEducationDialog>,
    private resumeEducationProvider: ResumeEducationProvider,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.method = sessionStorage.getItem('method')!;
    this.resumeId = sessionStorage.getItem('resume_id')!;
    this.initForm();
  }

  initForm(): void {
    this.educationForm = this.fb.group({
      schooling: [null, Validators.required],
      situation: [null, Validators.required],
      course: [null, [Validators.required, Validators.maxLength(100)]],
      institution: [null, [Validators.required, Validators.maxLength(100)]],
      Resume: { id: this.resumeId },
    });
    if (this.data) {
      this.educationForm.patchValue(this.data);
    }
  }

  ngAfterViewInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
    sessionStorage.removeItem('education_id');
    sessionStorage.removeItem('method');
  }

  async save() {
    const data = this.educationForm.getRawValue();
    if (this.method === 'add') {
      try {
        const education = await this.resumeEducationProvider.store(data);
        sessionStorage.setItem('education_id', education.id);
      } catch (error: any) {
        console.log(error);
      }
    }
    if (this.method === 'edit') {
      try {
        this.educationId = sessionStorage.getItem('education_id');
        const updateEducation = await this.resumeEducationProvider.update(
          this.educationId,
          data
        );
      } catch (error: any) {
        console.log( error);
      }
    }
  }
}
