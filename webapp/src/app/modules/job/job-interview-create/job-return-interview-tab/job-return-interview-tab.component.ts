import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewsProvider } from 'src/providers/interview.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { ReturnProvider } from 'src/providers/return.provider';

@Component({
  selector: 'app-job-return-interview-tab',
  templateUrl: './job-return-interview-tab.component.html',
  styleUrls: ['./job-return-interview-tab.component.scss']
})
export class JobReturnInterviewTabComponent implements OnInit {
  returnForm!: FormGroup;
  jobId!: any;
  interviewId!: string | null;
  interview: any;
  selectedIndex: number = 0;
  step: number = 1;

  constructor(
    private fb: FormBuilder,
    private ReturnProvider: ReturnProvider,
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
      this.returnForm.patchValue(
        this.interview.ReturnInterviews
        );
        console.log("🚀 ~ file: job-return-interview-tab.component.ts ~ line 49 ~ JobReturnInterviewTabComponent ~ ngOnInit ~ this.interview.ReturnInterviews", this.interview.ReturnInterviews)
      
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
      this.returnForm.patchValue(this.interview.ReturnInterviews);
    }
  }

  initForm() {
    this.returnForm = this.fb.group({
      nameCandidate: ['', Validators.required],
      dateOfReturn: this.fb.control({ value: ' ', disabled: false }, [DocumentValidator.isValidData(), Validators.required]),
      technicalEvaluation: [1, Validators.required],
      behavioralEvaluation: [1, Validators.required],
      technicalEvaluationComent: ['', Validators.required],
      behavioralEvaluationComent: ['', Validators.required],
      returnOfCandidate: [true, Validators.required],
      reason: [1, Validators.required],
      typeOdContract: [1, Validators.required],
      combinedValue: ['', Validators.required],
      initialData: this.fb.control({ value: new Date().toLocaleDateString(), disabled: false }, [DocumentValidator.isValidData(), Validators.required]),
    });
  }

  onChange(value: number) {
    if (this.returnForm.controls['situational'].value == 5) {
      this.removeValidators()
      console.log(this.returnForm)
    }
  }



  removeValidators() {
    this.returnForm.controls['punctuality'].clearValidators();
    this.returnForm.controls['punctuality'].updateValueAndValidity();
    this.returnForm.controls['punctuality'].setErrors(null); 


    this.returnForm.controls['presentation'].clearValidators();
    this.returnForm.controls['presentation'].updateValueAndValidity();
    this.returnForm.controls['presentation'].setErrors(null);

    this.returnForm.controls['salaryExpectation'].clearValidators();
    this.returnForm.controls['salaryExpectation'].updateValueAndValidity();
    this.returnForm.controls['salaryExpectation'].setErrors(null);


    this.returnForm.controls['availabilityOfInitialize'].clearValidators();
    this.returnForm.controls['availabilityOfInitialize'].updateValueAndValidity();
    this.returnForm.controls['availabilityOfInitialize'].setErrors(null);
  }

  backToList() {
    const jobId = sessionStorage.getItem('job_id');
    this.router.navigate([`vaga/detalhe/${jobId}`]);
    sessionStorage.removeItem('job_id');
  }

  async saveInterview() {
    await this.saveReturnInterviews();
  }

  async saveReturnInterviews() {
    if (this.interviewId == 'novo') {
      let data = this.returnForm.getRawValue();
      const interview = { ReturnInterviews: data, Job: this.jobId };
      try {
        delete data.id;
        await this.interviewsProvider.store(interview);
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
      let returnForm = this.returnForm.getRawValue();
      const interview = {
        ...this.interview,
        ReturnInterviews: { ...returnForm },
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
