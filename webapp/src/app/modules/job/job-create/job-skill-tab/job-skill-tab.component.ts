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
import { JobDialogSkill } from './job-skill-dialog.component';

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
    if (
      this.knowledgeArray.value.findIndex(
        (knowledge: any) => knowledge == null
      ) === -1
    ) {
      this.data = this.knowledgeArray.value;
    }

    this.initObservables();
  }

  initObservables() {
    this.knowledgeArray.valueChanges.subscribe((res) => {
      const isNullIndex = this.knowledgeArray.value.findIndex(
        (knowledge: any) => knowledge == null
      );
      if (isNullIndex !== -1) {
        this.knowledgeArray.removeAt(isNullIndex);
      }
      if (res) {
        this.data = this.knowledgeArray.value;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(JobDialogSkill, {
      width: '450px',
      height: '200px',
    });

    dialogRef.afterClosed().subscribe((knowledge) => {
      if (knowledge) {
        this.knowledgeArray.insert(0, this.fb.group(knowledge));
        this.knowledgeTable.renderRows();
      }
    });
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
