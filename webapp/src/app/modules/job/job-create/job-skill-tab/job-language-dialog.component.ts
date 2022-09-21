import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    Inject,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobLanguageProvider } from 'src/providers/job-providers/job-languages.provider';

@Component({
    selector: 'job-dialog-languague',
    templateUrl: 'job-dialog-language.html',
    styleUrls: ['job-dialog-language.scss'],
})
export class JobDialogLanguage implements OnInit {
    @Input('form') jobForm!: FormGroup;
    @Output() onChange: EventEmitter<any> = new EventEmitter();

    languageForm!: FormGroup;
    method: any;
    jobId: any;
    languageId: any;

    constructor(
        public dialogRef: MatDialogRef<JobDialogLanguage>,
        private fb: FormBuilder,
        private jobLangagueProvider: JobLanguageProvider,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit(): void {
        this.method = sessionStorage.getItem('method_language');
        this.jobId = sessionStorage.getItem('job_id');
        this.initForm();

    }
    onNoClick(): void {
        this.dialogRef.close();
        sessionStorage.removeItem('language_id');
        sessionStorage.removeItem('method_language');
    }

    initForm(): void {
        this.languageForm = this.fb.group({
            languageName: [null, Validators.required],
            degreeOfInfluence: [null, Validators.required],
            Job: [this.jobId]
        });
        if (this.data) {
            this.languageForm.patchValue(this.data);
        }
    }

    async saveLanguage() {
        const data = this.languageForm.getRawValue();
        if (this.method === 'add') {
            try {
                const language = await this.jobLangagueProvider.store(data);
                sessionStorage.setItem('language_id', language.id);
            } catch (error: any) {
                console.log(error);
            }
        }
        if (this.method === 'edit') {
            try {
                this.languageId = sessionStorage.getItem('language_id');
                const updateLanguage = await this.jobLangagueProvider.update(
                    this.languageId,
                    data
                );
            } catch (error: any) {
                console.log(error);
            }
        }
    }

      close(){
        this.dialogRef.close();
        sessionStorage.clear;
      }
}
