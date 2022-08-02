import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { BehaviroalInterviewProvider } from 'src/providers/behaviroalInterview.provider';
import { InterviewsProvider } from 'src/providers/interview.provider';
import { SnackBarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-job-behavioral-interview-tab',
  templateUrl: './job-behavioral-interview-tab.component.html',
  styleUrls: ['./job-behavioral-interview-tab.component.scss']
})
export class JobBehavioralInterviewTabComponent implements OnInit {
  behavioralInterviewForm!: FormGroup;
  jobId!: any;
  interviewId!: string | null;
  interview: any;
  selectedIndex: number = 0;
  step: number = 1;

  constructor(
    private fb: FormBuilder,
    private behaviroalInterviewProvider: BehaviroalInterviewProvider,
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
    this.step = JSON.parse(sessionStorage.getItem('job_tab')!);
    if (this.jobId !== undefined) {
      sessionStorage.setItem('job_id', this.jobId.id);
    }

    if (this.interviewId !== 'novo') {
      this.getBehavioralInterview();
      this.initForm();
      this.setFormValue();
      this.interview = this.interviewsProvider.findOne(this.interviewId);
      this.behavioralInterviewForm.patchValue(
        this.interview.BehavioralInterviews
      );
      
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

  getBehavioralInterview(){
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
      this.behavioralInterviewForm.patchValue(this.interview.BehavioralInterviews);
    }
  }

  initForm() {
    this.behavioralInterviewForm = this.fb.group({
      id: null,
      nameCandidate: ['', Validators.required],
      techRecruter: ['', Validators.required],
      behavioralInterviewDate: this.fb.control({ value: ' ', disabled: false }, [DocumentValidator.isValidData(), Validators.required]),
      hourInterview: ['', Validators.required],
      punctuality: [null, Validators.required],
      presentation: [null, Validators.required],
      salaryExpectation: ['', Validators.required],
      hiringPreference: this.fb.group({
        intern: [false, Validators.required],
        naturalPerson: [false, Validators.required],
        legalPerson: [false, Validators.required],
        cooperative: [false, Validators.required],
      }),
      behavioralAssessment: ['', Validators.required],
      comments: [''],
      situational: [null, Validators.required],
      availabilityOfInitialize: ['', Validators.required],
    });
  };

  onChange(value: number) {
    if (this.behavioralInterviewForm.controls['situational'].value == 5) {
      this.removeValidatorsBehavioral()
      console.log(this.behavioralInterviewForm)
    }
  }



  removeValidatorsBehavioral() {
    this.behavioralInterviewForm.controls['punctuality'].clearValidators();
    this.behavioralInterviewForm.controls['punctuality'].updateValueAndValidity();
    this.behavioralInterviewForm.controls['punctuality'].setErrors(null); 


    this.behavioralInterviewForm.controls['presentation'].clearValidators();
    this.behavioralInterviewForm.controls['presentation'].updateValueAndValidity();
    this.behavioralInterviewForm.controls['presentation'].setErrors(null);

    this.behavioralInterviewForm.controls['salaryExpectation'].clearValidators();
    this.behavioralInterviewForm.controls['salaryExpectation'].updateValueAndValidity();
    this.behavioralInterviewForm.controls['salaryExpectation'].setErrors(null);


    this.behavioralInterviewForm.controls['availabilityOfInitialize'].clearValidators();
    this.behavioralInterviewForm.controls['availabilityOfInitialize'].updateValueAndValidity();
    this.behavioralInterviewForm.controls['availabilityOfInitialize'].setErrors(null);
  }

  backToList() {
    const jobId = sessionStorage.getItem('job_id');
    this.router.navigate([`vaga/detalhe/${jobId}`]);
    sessionStorage.removeItem('job_id');
  }

  async saveInterview() {
    await this.saveBehaviroalInterviews();
  }

  async saveBehaviroalInterviews() {
    if (this.interviewId == 'novo') {
      let data = this.behavioralInterviewForm.getRawValue();
      const interview = { BehavioralInterviews: data, Job: this.jobId };

      try {
        delete data.id;
        this.interview = await this.interviewsProvider.store(interview);
        this.snackbarService.successMessage(
          'Entrevista Comportamental Cadastrada Com Sucesso!'
        );

        const interviewId = this.interview.id;
        const jobId = sessionStorage.getItem('job_id');
        this.router.navigate([`vaga/detalhe/${jobId}`]);
        sessionStorage.removeItem('job_id');
      } catch (error) {
        console.log('ERROR 132' + error);
        this.snackbarService.showError('Falha ao Cadastrar');
      }
    } else {
      let behavioralInterviewForm = this.behavioralInterviewForm.getRawValue();
      const interview = {
        ...this.interview,
        BehavioralInterviews: { ...behavioralInterviewForm },
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
