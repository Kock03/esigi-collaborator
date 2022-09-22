import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewsProvider } from 'src/providers/interview.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { ReturnProvider } from 'src/providers/return.provider';
import { ResumeProvider } from 'src/providers/resume-providers/resume.provider';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { RequireMatch } from 'src/services/autocomplete.service';
import { DateValidator } from 'src/app/validators/date.validator';


@Component({
  selector: 'app-job-return-interview-tab',
  templateUrl: './job-return-interview-tab.component.html',
  styleUrls: ['./job-return-interview-tab.component.scss']
})
export class JobReturnInterviewTabComponent implements OnInit {
  @ViewChild('filterResume', { static: true }) filterResume!: ElementRef;

  returnForm!: FormGroup;
  jobId!: any;
  interviewId!: string | null;
  interview: any;
  selectedIndex: number = 0;
  step: number = 1;
  visibleResume: boolean = false;
  resumes!: any[];
  filteredResumes!: any[];
  filteredResumeList: any;
  resume!: any;
  ResumeControl = new FormControl('', [Validators.required, RequireMatch]);
  resumeValid: boolean = false;
  resumeId: any;

  constructor(
    private fb: FormBuilder,
    private ReturnProvider: ReturnProvider,
    private interviewsProvider: InterviewsProvider,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService,
    private router: Router,
    private resumeProvider: ResumeProvider
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;

    this.jobId = state;
  }

  async ngOnInit() {
    this.interviewId = this.route.snapshot.paramMap.get('id');
    this.step = JSON.parse(sessionStorage.getItem('job_tab')!);
    this.resumeId = sessionStorage.getItem('resume_name');

    if (this.jobId !== undefined) {
      sessionStorage.setItem('job_id', this.jobId.id);
    }

    if (this.interviewId !== 'novo') {
      this.getInterview();
      this.initForm();
      this.setFormValue();
      this.interview = await this.interviewsProvider.findOne(this.interviewId);
      this.returnForm.patchValue(
        this.interview.Returns
      );

    } else {
      this.initForm();
    }

    if (sessionStorage.getItem('job_tab') == undefined) {
      sessionStorage.setItem('job_tab', '1');
    }
    this.interviewId = this.route.snapshot.paramMap.get('id');
    this.step = JSON.parse(sessionStorage.getItem('job_tab')!);

    if (sessionStorage.getItem('method') == 'edit') {
      this.setFormValue();
    }
    this.initFilterResume()
    this.getResumeList()
  }

  async getResumeList() {
    this.filteredResumeList = this.resumes =
      await this.resumeProvider.findAll();
  }


  private initFilterResume() {
    this.ResumeControl.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((res) => {
        this._filterResume(res);
        if (res && res.id) {
          this.resumeValid = true;
        } else {
          this.resumeValid = false;
        }

      });

  }

  displayFnResume(user: any): string {
    if (typeof user === 'string' && this.resumes) {
      return this.resumes.find(
        (resume) => resume.id === user
      );
    }

    return user && user.firstName && user.lastName
      ? user.firstName + ' ' + user.lastName
      : '';
  }

  private async _filterResume(name: string): Promise<void> {
    const data = {
      name: name,
    };
    try {
      this.resumes = await this.resumeProvider.findByName(data);
    } catch (error) {
      console.error(error);
    }
  }


  getInterview() {
    try {
      this.interview = this.interviewsProvider.findOne(
        this.interviewId
      );

    } catch (error) {
      console.error(error);
    }
  }

  setFormValue() {
    if (this.interview) {
      this.ResumeControl.patchValue(this.resumeId);
      this.visibleResume = true;
      if (this.interview.Returns) {
        this.returnForm.patchValue(this.interview.Returns);
      }
    }
  }

  initForm() {
    this.returnForm = this.fb.group({
      dateOfReturn: this.fb.control({ value: new Date().toLocaleDateString(), disabled: false }),
      dateReturn: this.fb.control({ value: ' ', disabled: false }, [DateValidator.isValidData(), Validators.required]),
      technicalEvaluation: [null, Validators.required],
      behavioralEvaluation: [null, Validators.required],
      technicalEvaluationComent: ['', Validators.required],
      behavioralEvaluationComent: ['', Validators.required],
      returnOfCandidate: [null],
      reason: [null],
      typeOdContract: [null, Validators.required],
      combinedValue: [null],
      initialData: this.fb.control({ value: ' ', disabled: false }),
    });
  }

  onChange(value: number) {
    if (this.returnForm.controls['technicalEvaluation'].value == 3 && this.returnForm.controls['behavioralEvaluation'].value == 3) {
      this.removeValidators()
    }
  }



  removeValidators() {
    this.returnForm.controls['punctuality'].clearValidators();
    this.returnForm.controls['punctuality'].updateValueAndValidity();
    this.returnForm.controls['punctuality'].setErrors(null);

    this.returnForm.controls['reason'].clearValidators();
    this.returnForm.controls['reason'].updateValueAndValidity();
    this.returnForm.controls['reason'].setErrors(null);

    this.returnForm.controls['dateOfReturn'].clearValidators();
    this.returnForm.controls['dateOfReturn'].updateValueAndValidity();
    this.returnForm.controls['dateOfReturn'].setErrors(null);

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
    await this.saveCReturnInterviews();
  }

  async saveCReturnInterviews() {
    if (this.interviewId == 'novo') {
      let data = this.returnForm.getRawValue();
      const interview = { Returns: data, Job: this.jobId, nameCandidate: this.ResumeControl.value.id };
      try {
        delete data.id;
        await this.interviewsProvider.store(interview);
        this.snackbarService.successMessage(
          'Devolutiva Cadastrada Com Sucesso!'
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
        Returns: { ...returnForm },
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
