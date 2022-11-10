import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewsProvider } from 'src/providers/interview.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { ClientInterviewProvider } from 'src/providers/clientInterview.provider';
import { CustomerProvider } from 'src/providers/customer.provider';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ResumeProvider } from 'src/providers/resume-providers/resume.provider';
import { RequireMatch } from 'src/services/autocomplete.service';
import { DateValidator } from 'src/app/validators/date.validator';
import { isDateMinorThanToday } from 'src/app/validators/date-compare.validator';

@Component({
  selector: 'app-job-client-interview-tab',
  templateUrl: './job-client-interview-tab.component.html',
  styleUrls: ['./job-client-interview-tab.component.scss'],

})
export class JobClientInterviewTabComponent implements OnInit {
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild('filterResume', { static: true }) filterResume!: ElementRef;

  clientInterviewForm!: FormGroup;
  jobId!: any;
  interviewId!: string | null;
  interview: any;
  selectedIndex: number = 0;
  step: number = 1;
  visible: boolean = false;
  visibleResume: boolean = false;
  resumes!: any[];
  filteredResumes!: any[];
  filteredResumeList: any;
  resume!: any;
  ResumeControl = new FormControl('', [Validators.required, RequireMatch]);
  resumeValid: boolean = false;
  resumeId: any;
  customerControl = new FormControl('', [Validators.required, RequireMatch]);
  customers!: any[];
  filteredCustomers!: any[];
  filteredCustomerList: any;
  customer!: any;
  customerValid: boolean = false;
  customerId!: string | null;

  constructor(
    private fb: FormBuilder,
    private clientInterviewProvider: ClientInterviewProvider,
    private customerProvider: CustomerProvider,
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
    this.visible = false
    this.getCustomerList();
    this.initFilterCustomer();
    this.interviewId = this.route.snapshot.paramMap.get('id');
    this.step = JSON.parse(sessionStorage.getItem('job_tab')!);
    this.resumeId = sessionStorage.getItem('resume_name');
    this.customerId = sessionStorage.getItem('customer_id');
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
    this.filteredResumes = this.resumes =
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



  async getCustomerList() {
    this.filteredCustomerList = this.customers =
      await this.customerProvider.shortListCustomers();
  }

  private initFilterCustomer() {
    this.customerControl.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((res) => {
        this._filterCustomer(res);
        if (res && res.id) {
          this.customerValid = true;
        } else {
          this.customerValid = false;
        }

      });

  }

  displayFnCustomer(user: any): string {
    if (typeof user === 'string' && this.customers) {
      return this.customers.find(
        (customer) => customer.id === user
      );
    }
    return user && user.corporateName
      ? user.corporateName
      : '';
  }

  private async _filterCustomer(name: string): Promise<void> {
    const data = {
      corporateName: name,
      status: 1,
    };
    this.filteredCustomers = await this.customerProvider.findByName(
      data
    );



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

      if (this.interview.ClientInterviews) {
        this.clientInterviewForm.patchValue(this.interview.ClientInterviews);
        this.visible = true;
        this.customerControl.patchValue(this.customerId);
      }
    }

  }

  initForm() {
    this.clientInterviewForm = this.fb.group({
      evaluator: ['', Validators.required],
      clientInterviewDate: this.fb.control({ value: ' ', disabled: false }, [DateValidator.isValidData(), Validators.required]),
      hourInterview: ['', Validators.required],
      punctuality: [null, Validators.required],
      jobProfile: [true, Validators.required],
      technicalEvaluation: ['', Validators.required],
      comments: ['', Validators.required],
      situational: [null, Validators.required],
      //Job: { id: this.jobId },
    },
      {
        validator: [isDateMinorThanToday('clientInterviewDate')]
      });

    this.customerControl.valueChanges.subscribe((res) => {
      if (res && res.id) {
        this.clientInterviewForm.controls['evaluator'].setValue(res.id, {
          emitEvent: true,
        });
      }
    });
  }

  onChange(value: number) {
    if (this.clientInterviewForm.controls['situational'].value == 5) {
      this.removeValidators()
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
      const interview = { ClientInterviews: data, Job: this.jobId, nameCandidate: this.ResumeControl.value.id };
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
        console.log(error);
        this.snackbarService.showError('Falha ao Cadastrar');
      }
    }
  }
}
