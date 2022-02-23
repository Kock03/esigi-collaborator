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

@Component({
  selector: 'job-dialog-skill',
  templateUrl: 'job-dialog-skill.html',
})
export class JobDialogSkill implements OnInit {
  @Input('form') jobForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  knowledgeForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<JobDialogSkill>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { knowledgeSelected: any }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  initForm(): void {
    this.knowledgeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      yearsExperience: [1, Validators.required],
      typeOfPeriod: [1, Validators.required],
    });
    if (this.data && this.data.knowledgeSelected) {
      this.knowledgeForm.patchValue(this.data.knowledgeSelected);
    }
  }

  async saveKnowledge() {
    this.dialogRef.close(this.knowledgeForm.getRawValue());
  }
}
