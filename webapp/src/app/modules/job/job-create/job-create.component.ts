import { DatePipe, formatDate } from '@angular/common';

import { HttpClient } from '@angular/common/http';
import {
  Component,
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
import { JobProvider } from 'src/providers/job.provider';
import { SnackBarService } from 'src/services/snackbar.service';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'numeric', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'numeric', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'numeric' },
  },
};

@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MM-yyyy', this.locale);
    } else {
      return date.toDateString();
    }
  }
}

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class JobCreateComponent implements OnInit {
  @ViewChild('knowledgeTable') knowledgeTable!: MatTable<any>;

  displayedColumns: string[] = [
    'name',
    'yearsExperience',
    'typeOfPeriod',
    'icon',
  ];

  Date: any;
  jobForm!: FormGroup;
  step: number = 1;

  checked = false;

  index: any = null;
  Knowledge: any;

  jobId!: string | null;
  job!: any;

  validations = [
    ['jobName'],
    ['Knowledges'],
    ['typeOfJob'],
    ['requester'],
    ['client'],
    ['startForecast'],
    

  ]

  get knowledgeArray() {
    return this.jobForm.controls['Knowledges'] as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private jobProvider: JobProvider,
    private http: HttpClient,
    private snackbarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.jobId = this.route.snapshot.paramMap.get('id');
    if (sessionStorage.getItem('job_tab') == undefined) {
      sessionStorage.setItem('job_tab', '1');
    }
    this.step = JSON.parse(sessionStorage.getItem('job_tab')!);

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
    } catch (error) {
      console.error(error);
    }
  }



  initForm() {
    this.jobForm = this.fb.group({
      requester: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ],
      ],
      status: [''],
      publish: [false],
      client: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      typeOfJob: ['', Validators.required],
      temporary: [false],
      monthTime: [''],
      jobName: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
      ],
      startForecast: [new Date(), Validators.required],
      jobNumber: [
        '',
        [ Validators.max(10), Validators.min(1)],
      ],
      typeOfContract: [''],
      workplace: [''],
      workingDay: [
        '',
        [
          Validators.maxLength(50),
          Validators.minLength(5),
        ],
      ],
      minimumValue: [''],
      maximumValue: [''],
      openingDate: [new Date(), Validators.required],
      schooling: [''],
      collaboratorActivities: [''],
      skills: [''],
      attitudes: [''],
      Languages: this.fb.group({
        languageName: ['', [Validators.maxLength(20)]],
        degreeOfInfluence: [''],
      }),
      Seniorities: this.fb.group({
        intern: [false],
        junior: [false],
        pleno: [false],
        senior: [false],
      }),
      Knowledges: this.fb.array(this.job ? this.job.Knowledges : []),
    });
  }

  setFormValue() {
    if (this.job) {
      this.jobForm.patchValue(this.job);
      if (this.job.Languages[0]) {
        const languages = this.jobForm.controls['Languages'] as FormGroup;
        languages.patchValue(this.job.Languages[0]);
      }
    }
  }

  async saveJob() {
    let data = this.jobForm.getRawValue();

    try {
      data.Languages = new Array(data.Languages);
      const jobs = await this.jobProvider.store(data);

      this.snackbarService.successMessage('Vaga Cadastrada Com Sucesso');
      this.router.navigate(['vaga/lista']);
      sessionStorage.clear();
    } catch (error) {
      console.log('ERROR 132' + error);
      this.snackbarService.showError('Falha ao Cadastrar');
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

  handleChanges(value: any): void {}

  
  async saveEditJob() {
    let data = this.jobForm.getRawValue();
    try {
      data.Languages = new Array(data.Languages);
      const job = await this.jobProvider.update(this.jobId, data);
      this.snackbarService.successMessage('Vaga atualizada com sucesso');
      this.router.navigate(['vaga/lista']);
    } catch (error) {
      console.error(error);
    }
  }


checkValid(): boolean {
  let isValid = true;
  const validations = this.validations[this.step - 1];
  for (let index = 0; index < validations.length; index++) {
    if (this.jobForm.controls[validations[index]].invalid) {
      isValid = false;

      this.jobForm.markAllAsTouched();
    }
  }
  return isValid;
}
}
