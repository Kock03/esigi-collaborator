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

export interface Knowledge {
  name: string;
  yearsExperience: number;
  typeOfPeriod: number;
}

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'numeric', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'numeric', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'numeric' },
  },
};

class PickDateAdapter extends NativeDateAdapter {
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
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
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
  selectedIndex: number = 0;

  date: any;

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
    await this.getJob();

    this.setFormValue();
  }

  async getJob() {
    try {
      this.job = await this.jobProvider.findOne(this.jobId);
      console.log(this.job);
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
      Knowledges: this.fb.array([]),
    });
  }

  setFormValue() {
    this.jobForm.patchValue(this.job);
    if (this.job.Languages[0]) {
      const languages = this.jobForm.controls['Languages'] as FormGroup;
      languages.addControl('id', new FormControl());
      languages.patchValue(this.job.Languages[0]);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(JobDialogSkill, {
      width: '450px',
      height: '200px',
    });

    dialogRef.afterClosed().subscribe((knowledge) => {
      this.knowledgeArray.insert(0, this.fb.group(knowledge)),
        this.knowledgeTable.renderRows();
    });
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
      console.log(this.job);
    } catch (error) {
      console.error(error);
    }
  }

  deleteKnowledge(index: number) {
    this.knowledgeArray.removeAt(index);
  }

  listJob() {
    this.router.navigate(['vaga/lista']);
  }
}

@Component({
  selector: 'job-dialog-skill',
  templateUrl: 'job-dialog-skill.html',
})
export class JobDialogSkill implements OnInit {
  @Input('form') jobForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  knowledgeForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<JobDialogSkill>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  initForm(): void {
    this.knowledgeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      yearsExperience: [1, Validators.required],
      typeOfPeriod: [1, Validators.required],
    });
  }

  async saveKnowledge() {
    this.dialogRef.close(this.knowledgeForm.getRawValue());
  }
}
