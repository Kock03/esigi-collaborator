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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

export interface skill {
  tecnology: string;
  seniority: string;
  yearsExperience: string;
  currentPosition: boolean;
}

@Component({
  selector: 'app-collaborator-skill-tab',
  templateUrl: './collaborator-skill-tab.component.html',
  styleUrls: ['./collaborator-skill-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorSkillTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
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
    return this.collaboratorForm.controls['Skills'] as FormArray;
  }

  constructor(private fb: FormBuilder,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initForm();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CollaboratorSkillDialog, {
      width: '500px',
      height: '470px',
    });

    dialogRef.afterClosed().subscribe((skill) => {
      this.skillArray.insert(0, this.fb.group(skill));
      this.skillTable.renderRows();
    });
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

@Component({
  selector: 'collaborator-skill-dialog',
  templateUrl: 'collaborator-skill-dialog.html',
})
export class CollaboratorSkillDialog{

  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  skillForm!: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<CollaboratorSkillDialog>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.skillForm = this.fb.group({
      tecnology:['', Validators.required],
      seniority: [1, Validators.required],
      yearsExperience: ['', Validators.required],
      currentPosition: [Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.skillForm.value);
  }
}
