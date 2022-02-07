import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-job-interview-tab',
  templateUrl: './job-interview-tab.component.html',
  styleUrls: ['./job-interview-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobInterviewTabComponent implements OnInit {
  behavioralInterviewForm!: FormGroup;
  technicalInterview!: FormGroup;
  clientInterview!: FormGroup;

  step: number = 1;
  selectedIndex: number = 0;
  disable = false;
  typeControl = new FormControl();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.behavioralInterviewForm = this.fb.group({
      nameCandidate: ['', Validators.required],
      techRecruter: ['', Validators.required],
      interviewDate: ['', Validators.required],
      hourInterview: ['', Validators.required],
      punctuality: [1, Validators.required],
      presentation: [1, Validators.required],
      salaryExpectation: ['', Validators.required],
      hiringPreference: this.fb.group({
        intern: [false, Validators.required],
        naturalPerson: [false, Validators.required],
        legalPerson: [false, Validators.required],
        cooperative: [false, Validators.required],
      }),
      behavioralAssessment: ['', Validators.required],
      comments: ['', Validators.required],
      situational: [1, Validators.required],
      availabilityOfInitialize: ['', Validators.required],
    });
    this.technicalInterview = this.fb.group({
      nameCandidate: ['', Validators.required],
      evaluator: ['', Validators.required],
      interviewDate: ['', Validators.required],
      hourInterview: ['', Validators.required],
      punctuality: [1, Validators.required],
      jobProfile: [true, Validators.required],
      technicalEvaluation: ['', Validators.required],
      comments: ['', Validators.required],
      situational: [1, Validators.required],
    });

    this.clientInterview = this.fb.group({
      nameCandidate: ['', Validators.required],
      evaluator: ['', Validators.required],
      interviewDate: ['', Validators.required],
      hourInterview: ['', Validators.required],
      punctuality: [1, Validators.required],
      jobProfile: [true, Validators.required],
      technicalEvaluation: ['', Validators.required],
      comments: ['', Validators.required],
      situational: [1, Validators.required],
    });
  }

  nextStep() {
    if (this.selectedIndex != 1) {
      this.selectedIndex = this.selectedIndex + 1;
    }
  }

  previousStep() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndex - 1;
    }
  }
}
