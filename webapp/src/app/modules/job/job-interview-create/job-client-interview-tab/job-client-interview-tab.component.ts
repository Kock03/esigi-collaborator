import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewsProvider } from 'src/providers/interview.provider';
import { TechnicalInterviewProvider } from 'src/providers/technicalInterview.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { DocumentValidator } from 'src/app/validators/document.validator';

@Component({
  selector: 'app-job-client-interview-tab',
  templateUrl: './job-client-interview-tab.component.html',
  styleUrls: ['./job-client-interview-tab.component.scss']
})
export class JobClientInterviewTabComponent implements OnInit {
  clientInterviewForm!: FormGroup;
  jobId!: any;
  interviewId!: string | null;
  interview: any;
  selectedIndex: number = 0;

  constructor(
    private fb: FormBuilder,
    private technicalInterviewProvider: TechnicalInterviewProvider,
    private interviewsProvider: InterviewsProvider,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService,
    private router: Router,
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
      this.clientInterviewForm.patchValue(
        this.interview.BehavioralInterviews
      );
    } else {
      this.initForm();
    }
  }

  initForm() {
    this.clientInterviewForm = this.fb.group({
      nameCandidate: ['', Validators.required],
      evaluator: ['', Validators.required],
      clientInterviewDate: this.fb.control({ value: ' ', disabled: false }, [DocumentValidator.isValidData(), Validators.required]),
      hourInterview: ['', Validators.required],
      punctuality: [1, Validators.required],
      jobProfile: [true, Validators.required],
      technicalEvaluation: ['', Validators.required],
      comments: ['', Validators.required],
      situational: [1, Validators.required],
  }); 
  }

  onChange(value: number) {
    if (this.clientInterviewForm.controls['situational'].value == 5) {
      this.removeValidatorsBehavioral()
      console.log(this.clientInterviewForm)
    }
  }



  removeValidatorsBehavioral() {
    this.clientInterviewForm.controls['punctuality'].clearValidators();
    this.clientInterviewForm.controls['punctuality'].updateValueAndValidity();
    this.clientInterviewForm.controls['punctuality'].setErrors(null); 


    this.clientInterviewForm.controls['presentation'].clearValidators();
    this.clientInterviewForm.controls['presentation'].updateValueAndValidity();
    this.clientInterviewForm.controls['presentation'].setErrors(null);

    this.clientInterviewForm.controls['salaryExpectation'].clearValidators();
    this.clientInterviewForm.controls['salaryExpectation'].updateValueAndValidity();
    this.clientInterviewForm.controls['salaryExpectation'].setErrors(null);


    this.clientInterviewForm.controls['availabilityOfInitialize'].clearValidators();
    this.clientInterviewForm.controls['availabilityOfInitialize'].updateValueAndValidity();
    this.clientInterviewForm.controls['availabilityOfInitialize'].setErrors(null);
  }

  backToList() {
    const jobId = sessionStorage.getItem('job_id');
    this.router.navigate([`vaga/detalhe/${jobId}`]);
    sessionStorage.removeItem('job_id');
  }

  async saveInterview() {
    await this.saveClientInterview();
  }

  async saveClientInterview(){
    if (this.interviewId == 'novo') {
      let clientInterviewForm = this.clientInterviewForm.getRawValue();
      const interview = {
          ...this.interview,
          ClientInterviews: { ...clientInterviewForm },
      };
      try {
          await this.interviewsProvider.update(interview);
          this.snackbarService.successMessage(
              'Entrevista de Cliente Cadastrada Com Sucesso!'
          );
          this.selectedIndex = this.selectedIndex + 1;
      } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Cadastrar');
      }
  } else {
      let clientInterviewForm = this.clientInterviewForm.getRawValue();
      const interview = {
          ...this.interview,
          ClientInterviews: { ...clientInterviewForm },
      };
      try {
          await this.interviewsProvider.update(interview);
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
