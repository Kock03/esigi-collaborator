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
import { JobKnowledgeProvider } from 'src/providers/job-providers/job-knowledges.provider';

@Component({
  selector: 'job-dialog-skill',
  templateUrl: 'job-dialog-skill.html',
  styleUrls: ['job-skill-dialog.scss'],
})
export class JobDialogSkill implements OnInit {
  @Input('form') jobForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  knowledgeForm!: FormGroup;
  method: any;
  jobId: any;
  knowledgeId: any;


  constructor(
    public dialogRef: MatDialogRef<JobDialogSkill>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private jobKnowledgeProvider: JobKnowledgeProvider

  ) { }

  ngOnInit(): void {
    this.method = sessionStorage.getItem('method_knowledge');
    this.jobId = sessionStorage.getItem('job_id');
    this.initForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
    sessionStorage.removeItem('knowledge_id');
    sessionStorage.removeItem('method_knowledge');
  }

  initForm(): void {
    this.knowledgeForm = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(20)]],
      yearsExperience: [null, Validators.required],
      typeOfPeriod: [null, Validators.required],
      Job: [this.jobId]
    });
    if (this.data) {
      this.knowledgeForm.patchValue(this.data);
    }
  }

  async saveKnowledge() {
    const data = this.knowledgeForm.getRawValue();
    if (this.method === 'add') {
      try {
        const knowledge = await this.jobKnowledgeProvider.store(data);
        sessionStorage.setItem('knowledge_id', knowledge.id);
      } catch (error: any) {
        console.log(error);
      }
    }
    if (this.method === 'edit') {
      try {
        this.knowledgeId = sessionStorage.getItem('knowledge_id');
        const updateknowledge = await this.jobKnowledgeProvider.update(
          this.knowledgeId,
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
