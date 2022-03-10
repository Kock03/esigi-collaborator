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
  jobId!: string;
  interviewId!: string | null;
  id!: any;
  get!: any;
  step: number = 1;
  selectedIndex: number = 0;
  disable = false;
  interview: IInterview[] = [];
  interviews: any;
  typeControl = new FormControl();
 
  constructor(
    private fb: FormBuilder,
    private behaviroalInterviewProvider: BehaviroalInterviewProvider,
    private technicalInterviewProvider: TechnicalInterviewProvider,
    private clientInterviewProvider: ClientInterviewProvider,
    private ReturnProvider: ReturnProvider,
    private snackbarService: SnackBarService,
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router,
    private interviewsProvider: InterviewsProvider
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    console.log("🚀 ~ file: job-interview-create.component.ts ~ line 64 ~ JobInterviewCreateComponent ~ ngOnInit ~ state", state)
    if (state){
      this.jobId = state['jobId'];
    }
  }

  async ngOnInit(): Promise<void> {
  

    this.interviewId = this.route.snapshot.paramMap.get('id');
    console.log(
      this.interviewId
    );

    if (this.interviewId !== 'novo') {
      this.initForm();
      this.interviews = await this.interviewsProvider.findOne(
        this.interviewId
      );
        this.behavioralInterviewForm.patchValue(this.interviews.BehavioralInterviews);
        this.technicalInterviewForm.patchValue(this.interviews.TechnicalInterviews);
        this.clientInterviewForm.patchValue(this.interviews.ClientInterviews);
    } else {
      this.initForm();
    }

  }

  initForm() {
    this.behavioralInterviewForm = this.fb.group({
      id: null,
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
      Job: { id: this.jobId },
    });
    this.technicalInterviewForm = this.fb.group({
      id: null,
      nameCandidate: ['', Validators.required],
      evaluator: ['', Validators.required],
      technicalInterviewDate: ['', Validators.required],
      hourInterview: ['', Validators.required],
      punctuality: [1, Validators.required],
      jobProfile: [true, Validators.required],
      technicalEvaluation: ['', Validators.required],
      comments: ['', Validators.required],
      situational: [1, Validators.required],
      //Job: { id: this.jobId },
    });

    this.clientInterviewForm = this.fb.group({
      id: null,
      nameCandidate: ['', Validators.required],
      evaluator: ['', Validators.required],
      clientInterviewDate: ['', Validators.required],
      hourInterview: ['', Validators.required],
      punctuality: [1, Validators.required],
      jobProfile: [true, Validators.required],
      technicalEvaluation: ['', Validators.required],
      comments: ['', Validators.required],
      situational: [1, Validators.required],
      //Job: { id: this.jobId },
    });

    this.returnForm = this.fb.group({
      nameCandidate: ['', Validators.required],
      dateOfReturn: ['', Validators.required],
      technicalEvaluation: [1, Validators.required],
      behavioralEvaluation: [1, Validators.required],
      technicalEvaluationComent: ['', Validators.required],
      behavioralEvaluationComent: ['', Validators.required],
      returnOfCandidate: [true, Validators.required],
      reason: [1, Validators.required],
      typeOdContract: [1, Validators.required],
      combinedValue: ['', Validators.required],
      initialData: ['', Validators.required],
      //Job: { id: this.jobId },
    });
  }

  async handleInterviews(type: string) {
    switch (type) {
      case 'behavioral': {
        if (this.interviewId == 'novo') {
          await this.saveBehaviroalInterviews();
        } else {
        }
        break;
      }
      case 'technical': {
        if (this.interviewId == 'novo') {
          await this.saveBehaviroalInterviews();
        } else {
        }
        break;
      }

    }
   
  }


  async saveBehaviroalInterviews() { 
    let data = this.behavioralInterviewForm.getRawValue();

    try {
      delete data.id;
      const res = await this.interviewsProvider.store(data)
      // const res = await this.behaviroalInterviewProvider.store(data);

      this.snackbarService.successMessage(
        'Entrevista Comportional Cadastrada Com Sucesso'
      );
      this.router.navigate([`vaga/interview/${res.id}`]);
      // this.nextStep();
    } catch (error) {
      console.log('ERROR 132' + error);
      this.snackbarService.showError('Falha ao Cadastrar');
    }
  }

  async saveTechnicalInterviews() {
    let data = this.technicalInterviewForm.getRawValue();

    try {
      await this.technicalInterviewProvider.store(data);
      this.snackbarService.successMessage(
        'Entrevista Técnica Cadastrada Com Sucesso'
      );
      this.selectedIndex = this.selectedIndex + 1;
    } catch (error) {
      console.log('ERROR 132' + error);
      this.snackbarService.showError('Falha ao Cadastrar');
    }
  }

  async saveClientInterviews() {
    let data = this.clientInterviewForm.getRawValue();

    try {
      await this.clientInterviewProvider.store(data);

      this.snackbarService.successMessage(
        'Entrevista Cliente Cadastrada Com Sucesso'
      );
      this.selectedIndex = this.selectedIndex + 1;
    } catch (error) {
      console.log('ERROR 132' + error);
      this.snackbarService.showError('Falha ao Cadastrar');
    }
  }

  async saveReturns() {
    let data = this.returnForm.getRawValue();

    try {
      await this.ReturnProvider.store(data);

      this.snackbarService.successMessage('Retorno Cadastrada Com Sucesso');
      this.router.navigate(['vaga/lista']);
    } catch (error) {
      console.log('ERROR 132' + error);
      this.snackbarService.showError('Falha ao Cadastrar');
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

  backToList(jobId: string) {
    this.router.navigate([`vaga/detalhe/${jobId}`]);
  }
}
