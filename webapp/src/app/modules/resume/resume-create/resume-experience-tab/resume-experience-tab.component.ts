import { Expression } from '@angular/compiler';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatList } from '@angular/material/list';

export interface Experience {
  office: string;
  companyName: string;
  locality: string;
  active: boolean;
  startMonth: number;
  startYear: number;
  terminusMonth: number;
  terminusYear: number;
  sector: string;
  description: string;
}

@Component({
  selector: 'app-resume-experience-tab',
  templateUrl: './resume-experience-tab.component.html',
  styleUrls: ['./resume-experience-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeExperienceTabComponent implements OnInit {
  @Input('form') resumeForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  Experience: any;
  experienceList: any[] = [];
  experienceForm!: FormGroup;
  index: any = null;

  get experiencesArray() {
    return this.resumeForm.controls['Experiences'] as FormArray;
  }

  // constructor(private dialog: MatDialog,) { }

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (
      this.experiencesArray.value &&
      this.experiencesArray.value.findIndex(
        (education: any) => education == null
      ) === -1
    ) {
      this.experienceList = this.experiencesArray.value;

      this.initForm();
    }
  }


  initForm(): void {
    this.experienceForm = this.fb.group({
      office: ['', Validators.required],
      companyName: ['', Validators.required],
      locality: [''],
      active: [false],
      startMonth: ['', Validators.required],
      startYear: ['', Validators.required],
      terminusMonth: ['', Validators.required],
      terminusYear: ['', Validators.required],
      sector: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ResumeDialogExperience, {
      width: '500px',
      height: '620px',
    });

    dialogRef.afterClosed().subscribe((experience) => {
      this.experiencesArray.insert(0, this.fb.group(experience));
      this.experienceList.push(experience);
    });
  }

  next() {
    this.onChange.next(true);
  }

  deleteExperience(index: number) {
    this.experiencesArray.removeAt(index);
    this.experienceList.splice(index, 1);
  }

  getExperience(experienceSelected: any, index: number) {
    const dialogRef = this.dialog.open(ResumeDialogExperience, {
      width: '500px',
      height: '620px',
      data: { experienceSelected },
    });

    this.index = index;
    dialogRef.afterClosed().subscribe((experience) => {
      this.experiencesArray.controls[this.index].setValue(experience);
      this.experienceList[this.index] = experience;
    });
  }
}

@Component({
  selector: 'resume-dialog-experience',
  templateUrl: 'resume-dialog-experience.html',
  styleUrls: ['./resume-experience-tab.component.scss'],
})
export class ResumeDialogExperience {
  @Input('form') resumeForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  experienceForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { experienceSelected: any },
    public dialogRef: MatDialogRef<ResumeDialogExperience>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.experienceForm = this.fb.group({
      office: ['Gerente de operações', Validators.required],
      companyName: ['ENVOLTI Sistemas de Comunicação', Validators.required],
      locality: ['Blumenau'],
      active: [false],
      startMonth: ['11', Validators.required],
      startYear: ['2016', Validators.required],
      terminusMonth: ['01', Validators.required],
      terminusYear: ['2021', Validators.required],
      sector: ['Comercial', Validators.required],
      description: [
        'Define o direcionamento estratégico com o cliente',
        Validators.required,
      ],
    });

    if (this.data && this.data.experienceSelected) {
      this.experienceForm.patchValue(this.data.experienceSelected);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.experienceForm.value);
  }

  async saveExperience() {
    this.dialogRef.close(this.experienceForm.getRawValue());
  }
}
