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
  jobId!: any;
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

      this.jobId = state;
    
  }

  async ngOnInit(): Promise<void> {
    this.interviewId = this.route.snapshot.paramMap.get('id');

    if (this.interviewId !== 'novo') {
      this.initForm();
      this.interview = await this.interviewsProvider.findOne(this.interviewId);
      this.behavioralInterviewForm.patchValue(
        this.interview.BehavioralInterviews
      );
      this.technicalInterviewForm.patchValue(
        this.interview.TechnicalInterviews
      );
      this.clientInterviewForm.patchValue(this.interview.ClientInterviews);
    } else {
      this.initForm();
    }
    console.log(this.interview)
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
      comments: [''],
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
      returnOfCandidate: [true, Validators.required],
      reason: [1, Validators.required],
      typeOdContract: [1, Validators.required],
      combinedValue: ['', Validators.required],
      initialData: ['', Validators.required],

    });
  }

  async handleInterviews(type: string) {
    switch (type) {
      case 'behavioral': {

          await this.saveBehaviroalInterviews();
      
        break;
      }
      case 'technical': {
        await this.saveTechnicalInterviews();
        break;
      } 
      case 'client': {
        await this.saveClientInterviews();
        break;
      }
    }
  }

  async saveBehaviroalInterviews() {
    if(this.interviewId == 'novo') {
      let data = this.behavioralInterviewForm.getRawValue();
      const interview = { BehavioralInterviews: data, Job: this.jobId  };
  
      try {
        delete data.id;
        this.interview = await this.interviewsProvider.store(interview);
        console.log(interview);
        this.snackbarService.successMessage(
          'Entrevista Comportamental Cadastrada Com Sucesso'
        );


        const interviewId = this.interview.id
        this.router.navigate([`vaga/detalhe/${this.jobId.id}`]);
      console.log(this.interview.id)
      } catch (error) {
        console.log('ERROR 132' + error);
        this.snackbarService.showError('Falha ao Cadastrar');
      }

    }

    else{
      let behavioralInterviewForm = this.behavioralInterviewForm.getRawValue();
    const interview =  {
      ...this.interview,
      BehavioralInterviews: {...behavioralInterviewForm},
    }
    try {
      await this.interviewsProvider.update(interview);
      this.snackbarService.successMessage(
        'Entrevista Comportamental Cadastrada Com Sucesso'
      );
      this.selectedIndex = this.selectedIndex + 1;
    } catch (error) {
      console.log('ERROR 132' + error);
      this.snackbarService.showError('Falha ao Cadastrar');
    }
    }
 
  }

  async saveTechnicalInterviews() {
    if(this.interviewId == 'novo'){
      let data = this.technicalInterviewForm.getRawValue();
    const interview = { TechnicalInterviews: data, Job:  this.jobId };
    try {
      delete data.id;
      await this.interviewsProvider.store(interview);
      this.snackbarService.successMessage(
        'Entrevista Técnica Cadastrada Com Sucesso'
      );
      this.router.navigate([`vaga/detalhe/${this.jobId.id}`]);
      this.selectedIndex = this.selectedIndex + 1;
    } catch (error) {
      console.log('ERROR 132' + error);
      this.snackbarService.showError('Falha ao Cadastrar');
    }
    }
    else{
      let technicalInterviewForm = this.technicalInterviewForm.getRawValue();
    const interview =  {
      ...this.interview,
      TechnicalInterviews: {...technicalInterviewForm},
    }
    try {
      await this.interviewsProvider.update(interview);
      this.snackbarService.successMessage(
        'Entrevista Técnica Cadastrada Com Sucesso'
      );
      this.selectedIndex = this.selectedIndex + 1;
    } catch (error) {
      console.log('ERROR 132' + error);
      this.snackbarService.showError('Falha ao Cadastrar');
    }
    }
  }


  async saveClientInterviews() {
    let clientInterviewForm = this.clientInterviewForm.getRawValue();
    const interview =  {
      ...this.interview,
      ClientInterviews: {...clientInterviewForm},
    }
    try {
      await this.interviewsProvider.update(interview);
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
