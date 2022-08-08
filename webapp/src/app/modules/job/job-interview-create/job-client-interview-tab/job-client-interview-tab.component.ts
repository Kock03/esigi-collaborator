import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewsProvider } from 'src/providers/interview.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { ClientInterviewProvider } from 'src/providers/clientInterview.provider';

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
  step: number = 1;

  constructor(
    private fb: FormBuilder,
    private clientInterviewProvider: ClientInterviewProvider,
    private interviewsProvider: InterviewsProvider,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService,
    private router: Router,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;

    this.jobId = state;
  }

 async  ngOnInit() {
    this.interviewId = this.route.snapshot.paramMap.get('id');
    this.step = JSON.parse(sessionStorage.getItem('job_tab')!);
    if (this.jobId !== undefined) {
      sessionStorage.setItem('job_id', this.jobId.id);
    }

    if (this.interviewId !== 'novo') {
      this.getInterview();
      this.initForm();
      this.setFormValue();
      this.interview = await this.interviewsProvider.findOne(this.interviewId);
      this.clientInterviewForm.patchValue(
        this.interview.ClientInterviews
        );
        console.log("🚀 ~ file: job-client-interview-tab.component.ts ~ line 49 ~ JobClientInterviewTabComponent ~ ngOnInit ~ this.interview.ClientInterviews", this.interview.ClientInterviews)
      
    } else {
      this.initForm();
    }

    if (sessionStorage.getItem('job_tab') == undefined) {
      sessionStorage.setItem('job_tab', '1');
    }
    this.interviewId = this.route.snapshot.paramMap.get('id');
    this.step = JSON.parse(sessionStorage.getItem('job_tab')!);

    if (sessionStorage.getItem('method') == 'edit'){
      this. setFormValue();
    }
  }

  getInterview(){
    try {
      this.interview = this.interviewsProvider.findOne(
        this.interviewId
      );
      console.log("🚀 ~ file: job-interview-create.component.ts ~ line 103 ~ JobInterviewCreateComponent ~ getCollaborator ~ interview", this.interview)
      
    } catch (error) {
      console.error(error);
    }
  }

  setFormValue() {
    if (this.interview) {
      this.clientInterviewForm.patchValue(this.interview.ClientInterviews);
    }
  }

  initForm() {
    this.clientInterviewForm = this.fb.group({
      nameCandidate: ['', Validators.required],
      evaluator: ['', Validators.required],
      clientInterviewDate: this.fb.control({ value: ' ', disabled: false }, [DocumentValidator.isValidData(), Validators.required]),
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
    if (this.clientInterviewForm.controls['situational'].value == 5) {
      this.removeValidators()
      console.log(this.clientInterviewForm)
    }
  }



  removeValidators() {
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
    await this.saveClientInterviews();
  }

  async saveClientInterviews() {
    if (this.interviewId == 'novo') {
      let data = this.clientInterviewForm.getRawValue();
      const interview = { ClientInterviews: data, Job: this.jobId };
      try {
        delete data.id;
        await this.interviewsProvider.store(interview);
        this.snackbarService.successMessage(
          'Entrevista Cliente Cadastrada Com Sucesso!'
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
        const jobId = sessionStorage.getItem('job_id');
        this.router.navigate([`vaga/detalhe/${jobId}`]);
        this.selectedIndex = this.selectedIndex + 1;
      } catch (error) {
        console.log('ERROR 132' + error);
        this.snackbarService.showError('Falha ao Cadastrar');
      }
    }
  }
}
