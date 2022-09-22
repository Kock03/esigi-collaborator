import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResumeSkillsProvider } from 'src/providers/resume-providers/resume-skills.provider';

@Component({
  selector: 'resume-skill-dialog',
  templateUrl: 'resume-skill-dialog.html',
  styleUrls: ['./resume-skills-tab.component.scss'],
})
export class ResumeSkillDialog {
  @Input('form') collaboratorForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  skillForm!: FormGroup;
  method!: string;
  resumeId!: string | null;
  skillId!: string | null;

  constructor(
    public dialogRef: MatDialogRef<ResumeSkillDialog>,
    private resumeSkillsProvider:ResumeSkillsProvider,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.method = sessionStorage.getItem('method')!;
    this.resumeId = sessionStorage.getItem('resume_id')!;
    this.initForm();
  }

  initForm(): void {
    this.skillForm = this.fb.group({
      technology: [null, [Validators.required, Validators.maxLength(50)]],
      seniority: [null, Validators.required],
      yearsExperience: [null, [Validators.required, Validators.maxLength(2)]],
      typeOfPeriod:[null, Validators.required],
      currentPosition: [false],
      Resume: { id: this.resumeId },
    });
    if (this.data) {
      this.skillForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
    sessionStorage.removeItem('skill_id');
    sessionStorage.removeItem('method');
  }

  async save() {
    const data = this.skillForm.getRawValue();
    if (this.method === 'add') {
      try {
        const skill = await this.resumeSkillsProvider.store(data);
        sessionStorage.setItem('skill_id', skill.id);
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
    if (this.method === 'edit') {
      try {
        this.skillId = sessionStorage.getItem('skill_id');
        const updateSkill = await this.resumeSkillsProvider.update(
          this.skillId,
          data
        );
      } catch (error: any) {
        console.log( error);
      }
    }
  }

  close(){
    this.dialogRef.close();
    sessionStorage.clear();
  }
}
