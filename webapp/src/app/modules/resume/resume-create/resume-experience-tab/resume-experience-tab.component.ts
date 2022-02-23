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
import { ResumeDialogExperience } from './resume-experience-dialog.component';



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
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ResumeDialogExperience, {
      width: '500px',
      height: '620px',
    });

    dialogRef.afterClosed().subscribe((experience) => {
      if (experience) {
        this.experiencesArray.insert(0, this.fb.group(experience));
        this.experienceList.push(experience);
      }
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
      // this.experienceList[this.index] = experience;
    });
  }
}

