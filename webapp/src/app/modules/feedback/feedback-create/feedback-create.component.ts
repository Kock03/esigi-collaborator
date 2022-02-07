import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.scss']
})
export class FeedbackCreateComponent implements OnInit {

 feedbackForm!: FormGroup;

  step: number = 1;

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.feedbackForm = this.fb.group({
      feedbackType : ['', Validators.required],
      reason : ['', Validators.required],
      project : ['', Validators.required],
      status : ['', Validators.required],
      feedbackDate : ['', Validators.required],
      hourInput : ['', Validators.required],
      managementDescription : ['', Validators.required],
      improvementPoints : ['', Validators.required],
      collaboratorDescription : ['', Validators.required],
      commitment : ['', Validators.required],
    })
  }
}

