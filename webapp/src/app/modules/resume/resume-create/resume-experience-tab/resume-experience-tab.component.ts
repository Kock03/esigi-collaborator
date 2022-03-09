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
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
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
  @Input() experiencesArray!: FormArray;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  Experience: any;
  experienceList: any[] = [];
  experienceForm!: FormGroup;
  index: any = null;
  resumeId!: any;

  constructor(
    private dialogService: ConfirmDialogService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.experiencesArray.value.length > 0) {
      this.experienceList = this.experiencesArray.value;
    }
  }

  initObservables() {
    this.experiencesArray.valueChanges.subscribe(res => {
      const isNullIndex = this.experiencesArray.value.findIndex(
        (experience: any) => experience == null
      );
      if (isNullIndex !== -1) {
        this.experiencesArray.removeAt(isNullIndex);
      }
      if (res) {
        this.experienceList = this.experiencesArray.value;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ResumeDialogExperience, {
      width: '500px',
      height: '620px',
    });

    dialogRef.afterClosed().subscribe(experience => {
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
    const options = {
      data: {
        title: 'Anteção',
        subtitle: 'Você tem certeza que deseja excluir essas informações?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async confirmed => {
      if (confirmed) {
        this.experiencesArray.removeAt(index);
        this.experienceList.splice(index, 1);
      }
    });
  }

  getExperience(experienceSelected: any, index: number) {
    const dialogRef = this.dialog.open(ResumeDialogExperience, {
      width: '500px',
      height: '620px',
      data: experienceSelected,
    });

    this.index = index;
    dialogRef.afterClosed().subscribe(experience => {
      if (experience) {
        this.experiencesArray.controls[this.index].patchValue(experience);
      }
    });
  }
}
