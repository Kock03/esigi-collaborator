import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
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

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobCreateComponent implements OnInit {
  @ViewChild('knowledgeTable') knowledgeTable!: MatTable<any>;

  displayedColumns: string[] = [
    'name',
    'yearsExperience',
    'typeOfPeriod',
    'icon',
  ];

  get knowledgeArray() {
    return this.jobForm.controls['Knowledges'] as FormArray;
  }

  jobForm!: FormGroup;
  step: number = 1;

  checked = false;

  index: any = null;
  Knowledge: any;

  jobId!: string | null;
  job!: any;

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
    this.initForm();
    if (this.jobId !== 'novo') {
      await this.getJob();
      this.setFormValue();
    }

    this.step = 1;
  }

  async getJob() {
    try {
      this.job = await this.jobProvider.findOne(this.jobId);
    } catch (error) {
      console.error(error);
    }
  }

  handleChanges(value: any): void {}

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
      status: [1, Validators.required],
      publish: [false],
      client: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      typeOfJob: [1, Validators.required],
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
        1,
        [Validators.required, Validators.max(10), Validators.min(1)],
      ],
      typeOfContract: [1, Validators.required],
      workplace: [1, Validators.required],
      workingDay: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(5),
        ],
      ],
      minimumValue: [1, Validators.required],
      maximumValue: [1, Validators.required],
      openingDate: [new Date(), Validators.required],
      schooling: [1, Validators.required],
      collaboratorActivities: ['', Validators.required],
      skills: ['', Validators.required],
      attitudes: ['', Validators.required],
      Languages: this.fb.group({
        languageName: ['', [Validators.required, Validators.maxLength(20)]],
        degreeOfInfluence: [1, Validators.required],
      }),
      Seniorities: this.fb.group({
        intern: [false],
        junior: [false],
        pleno: [false],
        senior: [false],
      }),
      Knowledges: this.fb.array([new Array()]),
    });
  }

  setFormValue() {
    this.jobForm.patchValue(this.job);
    if (this.job.Languages[0]) {
      const languages = this.jobForm.controls['Languages'] as FormGroup;
      languages.patchValue(this.job.Languages[0]);
    }
    if (!this.job.Knowledges[0]) {
      const knowledge = this.jobForm.controls['Knowledges'] as FormArray;
      knowledge.value.splice(0, 1)
    }
  }

  handleStep(number: number): void {
    this.step = number;
  }

  async saveJob() {
    let data = this.jobForm.getRawValue();

    try {
      data.Languages = new Array(data.Languages);
      const jobs = await this.jobProvider.store(data);

      this.snackbarService.successMessage('Vaga Cadastrada Com Sucesso');
      this.router.navigate(['vaga/lista']);
    } catch (error) {
      console.log('ERROR 132' + error);
      this.snackbarService.showError('Falha ao Cadastrar');
    }
  }

  async saveEditJob() {
    let data = this.jobForm.getRawValue();
    try {
      data.Languages = new Array(data.Languages);
      const job = await this.jobProvider.update(this.jobId, data);
      this.snackbarService.successMessage('Vaga Atualizada com Sucesso');
      this.router.navigate(['vaga/lista']);
    } catch (error) {
      console.error(error);
    }
  }

  listJob() {
    this.router.navigate(['vaga/lista']);
  }

  navigate(direction: string) {
    if (this.step > 1 && direction === 'back') {
      this.step -= 1;
    } else if (this.step < 6 && direction === 'next') {
      this.step += 1;
    }
  }
}


