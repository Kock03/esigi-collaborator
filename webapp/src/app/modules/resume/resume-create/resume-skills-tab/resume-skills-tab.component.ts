import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';

export interface skill {
  tecnology: string;
  seniority: string;
  yearsExperience: string;
  currentPosition: boolean;
}

@Component({
  selector: 'app-resume-skills-tab',
  templateUrl: './resume-skills-tab.component.html',
  styleUrls: ['./resume-skills-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeSkillsTabComponent implements OnInit {
  @Input('form') resumeForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('skillTable') skillTable!: MatTable<any>;

  displayedColumns: string[] = ['name', 'time', 'level', 'icon'];

  skills: skill[] = [
    {
      tecnology: 'Java',
      yearsExperience: '',
      seniority: 'Senior',
      currentPosition: false,
    },
  ];

  selectedIndex: number = 0;

  skillForm!: FormGroup;

  index: any = null;
  Skill: any;
  checked = false;

  get skillArray() {
    return this.resumeForm.controls['Skills'] as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.skillForm = this.fb.group({
      tecnology: ['Java'],
      seniority: ['Senior'],
      yearsExperience: ['5'],
      currentPosition: [true],
    });
    
  }

  next() {
    this.onChange.next(true);
  }

  
  saveSkill() {
    const data = this.skillForm.getRawValue();
    this.skillArray.insert(0, this.fb.group(data));
    this.skillTable.renderRows();
    this.skillForm.reset();
  }

  getSkill(skillSelected: any, index: number) {
    this.index = index;
    this.skillForm.patchValue(skillSelected);
  }

  editSkill() {
    this.skillArray.at(this.index).setValue(this.skillForm.getRawValue());

    this.skillTable.renderRows();
    this.skillForm.reset();
    this.index = null;
  }

  cancelEdit(){
    this.index = null;
  }

  deleteSkill(index: number){
     this.skillArray.removeAt(index);
  
  }
}
