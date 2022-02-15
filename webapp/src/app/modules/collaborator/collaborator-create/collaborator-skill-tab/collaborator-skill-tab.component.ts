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
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface skill {
  technology: string;
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
      technology: 'Java',
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

  constructor(private fb: FormBuilder,public dialog: MatDialog,) {}

  ngOnInit(): void {
    this.initForm();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CollaboratorSkillDialog, {
      width: '500px',
      height: '470px',
    });

    dialogRef.afterClosed().subscribe((skill) => {
      if(skill){
        this.skillArray.insert(0, this.fb.group(skill));
        this.skillTable.renderRows();
      }
    });
  }



  initForm(): void {
    this.skillForm = this.fb.group({
      technology: ['Java'],
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
    const dialogRef = this.dialog.open(CollaboratorSkillDialog, {
      width: '500px',
      height: '620px',
      data: { skillSelected },

    });

    this.index = index;
    dialogRef.afterClosed().subscribe((skill) => {
      this.skillArray.controls[this.index].setValue(skill);
    });

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
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { skillSelected: any}
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.skillForm = this.fb.group({
      technology:['Angular', [Validators.required, Validators.maxLength(50)]],
      seniority: [1, Validators.required],
      yearsExperience: ['2', [Validators.required, Validators.maxLength(2)]],
      currentPosition: [true, Validators.required]
    });
    if (this.data && this.data.skillSelected) {
      this.skillForm.patchValue(this.data.skillSelected)
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.skillForm.getRawValue());
  }
}
