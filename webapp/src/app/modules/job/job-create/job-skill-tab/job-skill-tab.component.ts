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

@Component({
  selector: 'app-job-skill-tab',
  templateUrl: './job-skill-tab.component.html',
  styleUrls: ['./job-skill-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobSkillTabComponent implements OnInit {
  @Input('form') jobForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('knowledgeTable') knowledgeTable!: MatTable<any>;

  index: any = null;
  Knowledge: any;
  knowledgeForm!: FormGroup;

  data: [] = [];
  displayedColumns: string[] = [
    'name',
    'yearsExperience',
    'typeOfPeriod',
    'icon',
  ];

  get knowledgeArray() {
    return this.jobForm.controls['Knowledges'] as FormArray;
  }

  constructor(public dialog: MatDialog, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.jobForm.valueChanges.subscribe((res) => {
      this.data = this.knowledgeArray.value;
    });
  }

  logTeste(teste: any) {
    console.log(
      '🚀 ~ file: job-skill-tab.component.ts ~ line 48 ~ JobSkillTabComponent ~ log ~ teste',
      teste
    );
  }
  openDialog() {
    const dialogRef = this.dialog.open(JobDialogSkill, {
      width: '450px',
      height: '200px',
    });

    dialogRef.afterClosed().subscribe((knowledge) => {
      if (knowledge) {
        this.knowledgeArray.insert(0, this.fb.group(knowledge)),
          this.knowledgeTable.renderRows();
      }
    });
  }

  saveKnowledge() {
    const data = this.knowledgeForm.getRawValue();
    this.knowledgeArray.insert(0, this.fb.group(data));
    this.knowledgeTable.renderRows();
    this.knowledgeForm.reset();
  }

  getKnowledge(knowledgeSelected: any, index: number) {
    const dialogRef = this.dialog.open(JobDialogSkill, {
      width: '450px',
      height: '200px',
      data: { knowledgeSelected },
    });

    this.index = index;
    dialogRef.afterClosed().subscribe((knowledge) => {
      this.knowledgeArray.controls[this.index].setValue(knowledge);
    });
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

  knowledgeForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<JobDialogSkill>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { knowledgeSelected: any }
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
    if (this.data && this.data.knowledgeSelected) {
      this.knowledgeForm.patchValue(this.data.knowledgeSelected);
    }
  }

  async saveKnowledge() {
    this.dialogRef.close(this.knowledgeForm.getRawValue());
  }
}
