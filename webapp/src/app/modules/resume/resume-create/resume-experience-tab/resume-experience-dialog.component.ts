import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResumeExperienceProvider } from 'src/providers/resume-providers/resume-experience.provider';
import { DateValidator } from 'src/app/validators/date.validator';

@Component({
  selector: 'resume-dialog-experience',
  templateUrl: 'resume-dialog-experience.html',
  styleUrls: ['./resume-experience-tab.component.scss'],
})
export class ResumeDialogExperience {
  @Input('form') resumeForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  experienceForm!: FormGroup;
  method!: string;
  resumeId!: string | null;
  experienceId!: string | null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ResumeDialogExperience>,
    private resumeExperienceProvider:ResumeExperienceProvider,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.method = sessionStorage.getItem('method')!;
    this.resumeId = sessionStorage.getItem('resume_id')!;
    this.initForm();
  }

  initForm(): void {
    this.experienceForm = this.fb.group({
      office: ['', Validators.required],
      companyName: ['', Validators.required],
      locality: [''],
      active: [false],
      startMonth: ['',Validators.required],
      startYear: ['', Validators.required],
      terminusMonth: [''],
      terminusYear: ['' ],
      sector: ['', Validators.required],
      description: ['', Validators.required],
      Resume: { id: this.resumeId },
    });

    if (this.data) {
      this.experienceForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
    sessionStorage.removeItem('experience_id');
    sessionStorage.removeItem('method');
  }

  async saveExperience() {
    const data = this.experienceForm.getRawValue();
    if (this.method === 'add') {
      try {
        const experience = await this.resumeExperienceProvider.store(data);
        sessionStorage.setItem('experience_id', experience.id);
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
    if (this.method === 'edit') {
      try {
        this.resumeId = sessionStorage.getItem('experience_id');
        const updateSkill = await this.resumeExperienceProvider.update(
          this.resumeId
          ,
          data
        );
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
  }

  close(){
    this.dialogRef.close();
    sessionStorage.clear();
  }
}
