import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { JobProvider } from 'src/providers/job.provider';

export interface Knowledge {
  name: string;
  yearsExperience: number;
}

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobCreateComponent implements OnInit {
  @ViewChild('knowledgeTable') knowledgeTable!: MatTable<any>;

  displayedColumns: string[] = ['name', 'yearsExperience', 'icon'];

  get knowledgeArray() {
    return this.jobForm.controls['Knowledges'] as FormArray;
  }

  jobForm!: FormGroup;
  step: number = 1;
  selectedIndex: number = 0;
  disable = false;
  checked = false;

  index: any = null;
  Knowledge: any;

  knowledge: Knowledge[] = [
    {
      name: 'Java',
      yearsExperience: 1,
    },
  ];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private jobProvider: JobProvider,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.jobForm = this.fb.group({
      requester: ['Wellington', Validators.required],
      status: [1, Validators.required],
      publish: [false],
      client: ['Ambev', Validators.required],
      typeOfJob: [1, Validators.required],
      temporary: [false],
      monthTime: ['', Validators.required],
      jobName: ['Programador React', Validators.required],
      startForecast: ['', Validators.required],
      seniority: [1, Validators.required],
      jobNumber: [23232, Validators.required],
      typeOfContract: [1, Validators.required],
      workplace: [1, Validators.required],
      workingDay: ['2 horas', Validators.required],
      minimumValue: [1, Validators.required],
      maximumValue: [1, Validators.required],
      openingDate: ['', Validators.required],
      schooling: [1, Validators.required],
      collaboratorActivities: ['a', Validators.required],
      skills: ['a', Validators.required],
      attitudes: ['a', Validators.required],
      Languages: this.fb.group({
        languageName: ['Russo', Validators.required],
        degreeOfInfluence: [1, Validators.required],
      }),
      Knowledges: this.fb.array([]),
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(JobDialogSkill, {
      width: '450px',
      height: '200px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.Knowledge.name = result;
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
    console.log(
      '🚀 ~ file: job-create.component.ts ~ line 84 ~ JobCreateComponent ~ saveCustomer ~ data',
      data
    );

    try {
      const jobs = await this.jobProvider.store(data);
    } catch (error) {
      console.log('ERROR 132' + error);
    }
  }

  deleteKnowledge(index: number) {
    this.knowledgeArray.removeAt(index);
  }
}

@Component({
  selector: 'job-dialog-skill',
  templateUrl: 'job-dialog-skill.html',
})
export class JobDialogSkill implements OnInit {
  @Input('form') jobForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('knowledgeTable') knowledgeTable!: MatTable<any>;

  knowledgeForm!: FormGroup;

  knowledge: Knowledge[] = [
    {
      name: 'Java',
      yearsExperience: 1,
    },
  ];

  get knowledgeArray() {
    return this.jobForm.controls['Knowledges'] as FormArray;
  }

  constructor(
    public dialogRef: MatDialogRef<JobDialogSkill>,
    @Inject(MAT_DIALOG_DATA) public data: JobDialogSkill, private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  initForm(): void {
    this.knowledgeForm = this.fb.group({
      name: ['aaaaaaa', Validators.required],
      yearsExperience: [1, Validators.required],
    });
  }

  saveKnowledge() {
    const data = this.knowledgeForm.getRawValue();
    this.knowledgeArray.insert(0, this.fb.group(data));
    this.knowledgeTable.renderRows();
    this.knowledgeForm.reset();
  }
}
