import { Component, Input, Output, EventEmitter, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

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
      @Inject(MAT_DIALOG_DATA) public data: { experienceSelected: any },
      public dialogRef: MatDialogRef<ResumeDialogExperience>,
      private fb: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.initForm();
    }
  
    initForm(): void {
      this.experienceForm = this.fb.group({
        office: ['Gerente de operações', Validators.required],
        companyName: ['ENVOLTI Sistemas de Comunicação', Validators.required],
        locality: ['Blumenau'],
        active: [false],
        startMonth: ['11', Validators.required],
        startYear: ['2016', Validators.required],
        terminusMonth: ['01', Validators.required],
        terminusYear: ['2021', Validators.required],
        sector: ['Comercial', Validators.required],
        description: [
          'Define o direcionamento estratégico com o cliente',
          Validators.required,
        ],
      });
  
      if (this.data && this.data.experienceSelected) {
        this.experienceForm.patchValue(this.data.experienceSelected);
      }
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    async saveExperience() {
      this.dialogRef.close(this.experienceForm.getRawValue());
    }
  }
  