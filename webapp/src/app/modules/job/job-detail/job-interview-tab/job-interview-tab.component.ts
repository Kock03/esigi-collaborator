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
  technicalInterviewForm!: FormGroup;
  clientInterviewForm!: FormGroup;
  returnForm!: FormGroup;

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
      behavioralInterviewDate: ['', Validators.required],
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
    this.technicalInterviewForm = this.fb.group({
      nameCandidate: ['', Validators.required],
      evaluator: ['', Validators.required],
      technicalInterviewDate: ['', Validators.required],
      hourInterview: ['', Validators.required],
      punctuality: [1, Validators.required],
      jobProfile: [true, Validators.required],
      technicalEvaluation: ['', Validators.required],
      comments: ['', Validators.required],
      situational: [1, Validators.required],
    });

    this.clientInterviewForm = this.fb.group({
      nameCandidate: ['', Validators.required],
      evaluator: ['', Validators.required],
      clientInterviewDate: ['', Validators.required],
      hourInterview: ['', Validators.required],
      punctuality: [1, Validators.required],
      jobProfile: [true, Validators.required],
      technicalEvaluation: ['', Validators.required],
      comments: ['', Validators.required],
      situational: [1, Validators.required],
    });

    this.returnForm = this.fb.group({
      nameCandidate: ['', Validators.required],
      dateOfReturn: ['', Validators.required],
      technicalEvaluation: [1, Validators.required],
      behavioralEvaluation: [1, Validators.required],
      technicalEvaluationComent: ['', Validators.required],
      behavioralEvaluationComent: ['', Validators.required],
      returnOfCandidate: [1, Validators.required],
      reason: [1, Validators.required],
      typeOdContract: [1, Validators.required],
      combinedValue: ['', Validators.required],
      initialData: ['', Validators.required],
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
