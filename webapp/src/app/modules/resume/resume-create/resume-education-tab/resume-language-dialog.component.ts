import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResumeLanguageProvider } from 'src/providers/resume-providers/resume-language.provider';

@Component({
  selector: 'resume-language-dialog',
  templateUrl: 'resume-language-dialog.html',
  styleUrls: ['./resume-education-tab.component.scss'],
})
export class ResumeLanguageDialog {
  @Input('form') resumeForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  languageForm!: FormGroup;
  method!: string;
  resumeId!: string | null;
  languageId!: string | null;

  constructor(
    public dialogRef: MatDialogRef<ResumeLanguageDialog>,
    private fb: FormBuilder,
    private resumeLanguageProvider: ResumeLanguageProvider,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.method = sessionStorage.getItem('method')!;
    this.resumeId = sessionStorage.getItem('resume_id')!;
    this.initForm();
  }

  initForm(): void {
    this.languageForm = this.fb.group({
      languageName: [null, [Validators.required, Validators.maxLength(40)]],
      degreeOfInfluence: [null, Validators.required],
      Resume: { id: this.resumeId },
    });
    if (this.data) {
      this.languageForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
    sessionStorage.removeItem('language_id');
    sessionStorage.removeItem('method');
  }

  async save() {
    const data = this.languageForm.getRawValue();
    if (this.method === 'add') {
      try {
        const language = await this.resumeLanguageProvider.store(data);
        sessionStorage.setItem('language_id', language.id);
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
    if (this.method === 'edit') {
      try {
        this.languageId = sessionStorage.getItem('language_id');
        const updateLanguage = await this.resumeLanguageProvider.update(
          this.languageId,
          data
        );
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
  }
}
