import { DatePipe, formatDate } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
} from '@angular/material/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ICollaborator } from 'src/app/interfaces/icollaborator';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MustMatch } from 'src/app/validators/min-max-value.validator';
import { JobProvider } from 'src/providers/job-providers/job.provider';


@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobCreateComponent implements OnInit {
  @ViewChild('filter', { static: true }) filter!: ElementRef;


  collaboratorControl = new FormControl();
  customerControl = new FormControl();

  Date: any;
  jobForm!: FormGroup;
  step: number = 1;
  method: any;

  checked = false;
  collaborator!: any;
  index: any = null;
  Knowledge: any;
  language: any;

  jobId!: string | null;
  customerId!: string | null;
  collaboratorRequesterId!: string | null;
  job!: any;

  validations = [
    ['jobName'],
    ['Knowledges'],
    ['typeOfJob'],
    ['requester'],
    ['client'],
    ['startForecast'],


  ]


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private jobProvider: JobProvider,
    private collaboratorProvider: CollaboratorProvider,
    private http: HttpClient,
    private snackbarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id');
    if (sessionStorage.getItem('job_tab') == undefined) {
      sessionStorage.setItem('job_tab', '1');
    }
    this.method = sessionStorage.getItem('job_method')
    this.step = JSON.parse(sessionStorage.getItem('job_tab')!);
    this.jobId = this.route.snapshot.paramMap.get('id');
    this.customerId = sessionStorage.getItem('customer_id');
    this.collaboratorRequesterId = sessionStorage.getItem('collaboratorRequester_id');

    if (this.jobId !== 'novo') {
      await this.getJob();
      this.initForm();
      this.setFormValue();
    } else {
      this.initForm();
    }
  }

  async getJob() {
    try {
      this.job = await this.jobProvider.findOne(this.jobId);
      console.log(this.jobId)

    } catch (error) {
      console.error(error);
    }
  }



  initForm() {
    this.jobForm = this.fb.group({
      collaboratorRequesterId: [
        '',
        [
          Validators.required,
        ],
      ],
      status: [1],
      publish: [false],
      customerId: [
        '',
        [
          Validators.required,
        ],
      ],
      typeOfJob: ['', Validators.required],
      temporary: [false],
      monthTime: [''],
      jobName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),],
      ],
      startForecast: this.fb.control({ value: ' ', disabled: false }, [DocumentValidator.isValidData(), Validators.required]),
      jobNumber: ['', Validators.required],
      typeOfContract: [''],
      workplace: [''],
      workingDay: ['', Validators.required],
      minimumValue: [null],
      maximumValue: [null],
      openingDate: this.fb.control({ value: new Date().toLocaleDateString(), disabled: false }, [DocumentValidator.isValidData(), Validators.required]),
      schooling: [null],
      acquirements: [''],
      collaboratorActivities: [''],
      skills: [''],
      attitudes: [''],
      Seniorities: this.fb.group({
        intern: [false],
        junior: [false],
        pleno: [false],
        senior: [false],
      }),
    },
      {
        validator: [MustMatch('minimumValue', 'maximumValue')],
      });

    this.collaboratorControl.valueChanges.subscribe((res) => {
      if (res && res.id) {
        this.jobForm.controls['collaboratorRequesterId'].setValue(res.id, {
          emitEvent: true,
        });
      }
    });

    this.customerControl.valueChanges.subscribe((res) => {
      if (res && res.id) {
        this.jobForm.controls['customerId'].setValue(res.id, {
          emitEvent: true,
        });
      }
    });
  }

  setFormValue() {
    if (this.job) {
      this.jobForm.patchValue(this.job);
      this.customerControl.patchValue(this.customerId);
      this.collaboratorControl.patchValue(this.collaboratorRequesterId);
    }
  }

  async saveJob() {
    let data = this.jobForm.getRawValue();

    try {
      const job = await this.jobProvider.store(data);
      this.jobId = job.id;
      sessionStorage.setItem('job_method', 'edit');
      this.router.navigate([`vaga/${job.id}`]);
      this.method = 'edit'
      sessionStorage.setItem('job_id', job.id);

      this.handleStep(2)
      this.snackbarService.successMessage('Vaga Cadastrada Com Sucesso');
    } catch (error) {
      console.log(error);
      this.snackbarService.showError('Falha ao Cadastrar');
    }
  }

  async editJob() {
    let data = this.jobForm.getRawValue();
    try {
      const job = await this.jobProvider.update(
        this.jobId,
        data
      );
      this.router.navigate(['vaga/lista']);
      this.snackbarService.successMessage(
        'Vaga atualizado com sucesso!'
      );
    } catch (err: any) {
      this.snackbarService.showError(
        err.error?.message ?? 'Ocorreu um erro, tente novamente'
      );
    }
  }

  navigate(direction: string) {
    if (this.step > 1 && direction === 'back') {
      this.step === 1;
    } else if (this.checkValid() && this.step < 2 && direction === 'next') {
      this.step += 1;
    } else {
      this.snackbarService.showAlert('Verifique os campos');
    }
  }


  listJob() {
    this.router.navigate(['vaga/lista']);
    sessionStorage.clear();
  }

  handleStep(number: number): void {
    if (!this.checkValid() && this.step < number) {
      this.snackbarService.showAlert('Verifique os campos');
    } else if (this.step - number < 1) {
      this.step = number;
      sessionStorage.setItem('job_tab', this.step.toString());
    } else {
      this.step = number;
      sessionStorage.setItem('job_tab', this.step.toString());
    }
  }

  handleChanges(value: any): void { }


  checkValid(): boolean {
    let isValid = true;
    const validations = this.validations[0];
    for (let index = 0; index < validations.length; index++) {
      if (this.jobForm.controls[validations[index]].invalid) {
        isValid = false;

        this.jobForm.markAllAsTouched();
      }
    }
    return isValid;
  }

}
