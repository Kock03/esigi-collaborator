import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewsProvider } from 'src/providers/interview.provider';
import { TechnicalInterviewProvider } from 'src/providers/technicalInterview.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { DocumentValidator } from 'src/app/validators/document.validator';

@Component({
  selector: 'app-job-technical-interview-tab',
  templateUrl: './job-technical-interview-tab.component.html',
  styleUrls: ['./job-technical-interview-tab.component.scss']
})
export class JobTechnicalInterviewTabComponent implements OnInit {
  technicalInterviewForm!: FormGroup;
  jobId!: any;
  interviewId!: string | null;
  interview: any;
  selectedIndex: number = 0;

  constructor(
    private fb: FormBuilder,
    private technicalInterviewProvider: TechnicalInterviewProvider,
    private router: Router,
    private interviewsProvider: InterviewsProvider,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;

    this.jobId = state;
  }

  ngOnInit(): void {
    this.interviewId = this.route.snapshot.paramMap.get('id');
    if (this.jobId !== undefined) {
      sessionStorage.setItem('job_id', this.jobId.id);
    }

    if (this.interviewId !== 'novo') {
      this.initForm();
      this.interview = this.interviewsProvider.findOne(this.interviewId);
      this.technicalInterviewForm.patchValue(
        this.interview.BehavioralInterviews
      );
    } else {
      this.initForm();
    }
  }

  initForm() {
    this.technicalInterviewForm = this.fb.group({
      nameCandidate: ['', Validators.required],
      evaluator: ['', Validators.required],
      technicalInterviewDate: this.fb.control({ value: ' ', disabled: false }, [DocumentValidator.isValidData(), Validators.required]),
      hourInterview: ['', Validators.required],
      punctuality: [null, Validators.required],
      jobProfile: [true, Validators.required],
      technicalEvaluation: ['', Validators.required],
      comments: ['', Validators.required],
      situational: [null, Validators.required],
      //Job: { id: this.jobId },
    });
  }

  onChange(value: number) {
    if (this.technicalInterviewForm.controls['situational'].value == 5) {
      this.removeValidatorsBehavioral()
      console.log(this.technicalInterviewForm)
    }
  }



  removeValidatorsBehavioral() {
    this.technicalInterviewForm.controls['punctuality'].clearValidators();
    this.technicalInterviewForm.controls['punctuality'].updateValueAndValidity();
    this.technicalInterviewForm.controls['punctuality'].setErrors(null);


    this.technicalInterviewForm.controls['presentation'].clearValidators();
    this.technicalInterviewForm.controls['presentation'].updateValueAndValidity();
    this.technicalInterviewForm.controls['presentation'].setErrors(null);

    this.technicalInterviewForm.controls['salaryExpectation'].clearValidators();
    this.technicalInterviewForm.controls['salaryExpectation'].updateValueAndValidity();
    this.technicalInterviewForm.controls['salaryExpectation'].setErrors(null);


    this.technicalInterviewForm.controls['availabilityOfInitialize'].clearValidators();
    this.technicalInterviewForm.controls['availabilityOfInitialize'].updateValueAndValidity();
    this.technicalInterviewForm.controls['availabilityOfInitialize'].setErrors(null);
  }

  backToList() {
    const jobId = sessionStorage.getItem('job_id');
    this.router.navigate([`vaga/detalhe/${jobId}`]);
    sessionStorage.removeItem('job_id');
  }

  async saveInterview() {
    await this.saveTechnicalInterviews();
  }

  async saveTechnicalInterviews() {
    if (this.interviewId == 'novo') {
      let data = this.technicalInterviewForm.getRawValue();
      const interview = { TechnicalInterviews: data, Job: this.jobId };
      try {
        delete data.id;
        this.interviewsProvider.store(interview);
        this.snackbarService.successMessage(
          'Entrevista Técnica Cadastrada Com Sucesso!'
        );
        const jobId = sessionStorage.getItem('job_id');
        this.router.navigate([`vaga/detalhe/${jobId}`]);
        sessionStorage.removeItem('job_id');
        this.selectedIndex = this.selectedIndex + 1;
      } catch (error) {
        console.log('ERROR 132' + error);
        this.snackbarService.showError('Falha ao Cadastrar');
      }
    } else {
      let technicalInterviewForm = this.technicalInterviewForm.getRawValue();
      const interview = {
        ...this.interview,
        TechnicalInterviews: { ...technicalInterviewForm },
      };
      try {
        this.interviewsProvider.update(interview);
        this.snackbarService.successMessage(
          'Entrevista Atualizada Com Sucesso!'
        );
        this.selectedIndex = this.selectedIndex + 1;
      } catch (error) {
        console.log('ERROR 132' + error);
        this.snackbarService.showError('Falha ao Cadastrar');
      }
    }
  }
}
