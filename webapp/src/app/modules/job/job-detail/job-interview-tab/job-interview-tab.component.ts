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
  interviewForm!: FormGroup;

  step: number = 1;
  selectedIndex: number = 0;
  disable = false;
  typeControl = new FormControl();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.interviewForm = this.fb.group({
      form: ['', Validators.required],
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
