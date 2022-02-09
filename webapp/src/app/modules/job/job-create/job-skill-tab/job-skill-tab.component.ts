import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { JobDialogSkill } from '../job-create.component';

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

  displayedColumns: string[] = [
    'name',
    'yearsExperience',
    'typeOfPeriod',
    'icon',
  ];

  get knowledgeArray() {
    return this.jobForm.controls['Knowledges'] as FormArray;
  }
  
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {}


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

  
  deleteKnowledge(index: number) {
    this.knowledgeArray.removeAt(index);
  }
}
