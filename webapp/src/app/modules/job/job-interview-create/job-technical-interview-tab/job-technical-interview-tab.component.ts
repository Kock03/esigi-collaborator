import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewsProvider } from 'src/providers/interview.provider';
import { TechnicalInterviewProvider } from 'src/providers/technicalInterview.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';


@Component({
  selector: 'app-job-technical-interview-tab',
  templateUrl: './job-technical-interview-tab.component.html',
  styleUrls: ['./job-technical-interview-tab.component.scss']
})
export class JobTechnicalInterviewTabComponent implements OnInit {
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  technicalInterviewForm!: FormGroup;
  jobId!: any;
  interviewId!: string | null;
  interview: any;
  selectedIndex: number = 0;
  step: number = 1;

  collaboratorControl = new FormControl();
  collaborators!: any[];
  filteredCollaborators!: any[];
  filteredCollaboratorList: any;
  collaborator!: any;
  collaboratorValid: boolean = false;
  method: any;
  collaboratorRequesterId!: string | null;
  visible: boolean = false;


  constructor(
    private fb: FormBuilder,
    private technicalInterviewProvider: TechnicalInterviewProvider,
    private interviewsProvider: InterviewsProvider,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService,
    private router: Router,
    private collaboratorProvider: CollaboratorProvider,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;

    this.jobId = state;
  }

  async ngOnInit() {
    this.visible = false;
    this.getCollaboratorList();
    this.initFilterRequester();
    this.interviewId = this.route.snapshot.paramMap.get('id');
    this.step = JSON.parse(sessionStorage.getItem('job_tab')!);
    this.collaboratorRequesterId = sessionStorage.getItem('collaborator_id');
    if (this.jobId !== undefined) {
      sessionStorage.setItem('job_id', this.jobId.id);
    }

    if (this.interviewId !== 'novo') {
      this.getInterview();
      this.initForm();
      this.setFormValue();
      this.interview = await this.interviewsProvider.findOne(this.interviewId);
      

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

  async getCollaboratorList() {
    this.filteredCollaboratorList = this.collaborators =
      await this.collaboratorProvider.findGerente();
  }

  private initFilterRequester() {
    this.collaboratorControl.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((res) => {
        this._filterRequester(res);
        if (res && res.id) {
          this.collaboratorValid = true;
        } else {
          this.collaboratorValid = false;
        }

      });

  }

  displayFnRequester(user: any): string {
    if (typeof user === 'string' && this.collaborators) {
      return this.collaborators.find(
        (collaborator) => collaborator.id === user
      );
    }
    return user && user.firstNameCorporateName && user.lastNameFantasyName
      ? user.firstNameCorporateName + ' ' + user.lastNameFantasyName
      : '';
  }

  private async _filterRequester(name: string): Promise<void> {
    const params = `firstNameCorporateName=${name}`;
    this.filteredCollaborators = await this.collaboratorProvider.findByNameGerente(
      params
    );

  }



  getInterview() {
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
      this.technicalInterviewForm.patchValue(this.interview.TechnicalInterviews);
      this.visible = true;
      this.collaboratorControl.patchValue(this.collaboratorRequesterId);
    }
  }

  initForm() {
    this.technicalInterviewForm = this.fb.group({
      nameCandidate: ['', Validators.required],
      collaboratorRequesterId: ['', Validators.required],
      technicalInterviewDate: this.fb.control({ value: ' ', disabled: false }, [DocumentValidator.isValidData(), Validators.required]),
      hourInterview: ['', Validators.required],
      punctuality: [null, Validators.required],
      jobProfile: [true, Validators.required],
      technicalEvaluation: ['', Validators.required],
      comments: ['', Validators.required],
      situational: [null, Validators.required],
      //Job: { id: this.jobId },
    });

    this.collaboratorControl.valueChanges.subscribe((res) => {
      if (res && res.id) {
        this.technicalInterviewForm.controls['collaboratorRequesterId'].setValue(res.id, {
          emitEvent: true,
        });
      }
    });
  }



  onChange(value: number) {
    if (this.technicalInterviewForm.controls['situational'].value == 5) {
      this.removeValidators()
      console.log(this.technicalInterviewForm)
    }
  }



  removeValidators() {
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
      let technicalInterviewForm = this.technicalInterviewForm.getRawValue();
      const interview = {
        ...this.interview,
        TechnicalInterviews: { ...technicalInterviewForm },
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
