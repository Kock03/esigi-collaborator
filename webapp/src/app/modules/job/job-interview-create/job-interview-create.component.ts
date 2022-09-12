import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviroalInterviewProvider } from 'src/providers/behaviroalInterview.provider';
import { ClientInterviewProvider } from 'src/providers/clientInterview.provider';
import { TechnicalInterviewProvider } from 'src/providers/technicalInterview.provider';
import { ReturnProvider } from 'src/providers/return.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { Location } from '@angular/common';
import { InterviewsProvider } from 'src/providers/interview.provider';
import { IInterview } from 'src/app/interfaces/iinterview';
import { JobPanelModel } from 'src/models/job-panel-model';
import { DocumentValidator } from 'src/app/validators/document.validator';

@Component({
  selector: 'app-job-interview-create',
  templateUrl: './job-interview-create.component.html',
  styleUrls: ['./job-interview-create.component.scss'],
})
export class JobInterviewCreateComponent implements OnInit {
  behavioralInterviewForm!: FormGroup;
  technicalInterviewForm!: FormGroup;
  clientInterviewForm!: FormGroup;
  returnForm!: FormGroup;
  jobId!: any;
  job!: string | null;
  interviewId!: string | null;
  id!: any;
  get!: any;
  step: number = 1;
  selectedIndex: number = 0;
  disable = false;
  interviews: IInterview[] = [];
  interview: any;
  typeControl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private interviewsProvider: InterviewsProvider
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;

    this.jobId = state;
  }

  async ngOnInit(): Promise<void> {
    this.interviewId = this.route.snapshot.paramMap.get('id');
    this.step = JSON.parse(sessionStorage.getItem('job_tab')!);
    if (this.jobId !== undefined) {
      sessionStorage.setItem('job_id', this.jobId.id);
    }


    if (sessionStorage.getItem('job_tab') == undefined) {
      sessionStorage.setItem('job_tab', '1');
    }
    this.interviewId = this.route.snapshot.paramMap.get('id');
    this.step = JSON.parse(sessionStorage.getItem('job_tab')!);

    if (sessionStorage.getItem('method') == 'edit') {
      this.setFormValue();
    }
  }

  async getInterview() {
    try {
      this.interview = await this.interviewsProvider.findOne(
        this.interviewId
      );
    } catch (error) {
      console.error(error);
    }
  }

  setFormValue() {
    if (this.interview) {
      this.behavioralInterviewForm.patchValue(this.interview.BehavioralInterviews);
    }
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

  backToList() {
    const jobId = sessionStorage.getItem('job_id');
    this.router.navigate([`vaga/detalhe/${jobId}`]);
    sessionStorage.removeItem('job_id');
    sessionStorage.removeItem('resume_name');
    sessionStorage.removeItem('resume_id');
    sessionStorage.removeItem('method');
    sessionStorage.removeItem('collaborator_tech_id');
    sessionStorage.removeItem('customer_id');
    sessionStorage.removeItem('collaborator_id');
  }

  navigate(direction: string) {
    if (this.step > 1 && direction === 'back') {
      this.step -= 1;
    } else if (this.step < 5 && direction === 'next') {
      this.step += 1;
    }
  }

  handleStep(number: number): void {
    if (this.step - number < 1) {
      this.step = number;
      sessionStorage.setItem('job_tab', this.step.toString());
    } else {
      this.step = number;
      sessionStorage.setItem('job_tab', this.step.toString());
    }
  }
}

