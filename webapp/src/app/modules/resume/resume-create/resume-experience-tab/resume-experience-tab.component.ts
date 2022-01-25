import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-resume-experience-tab',
  templateUrl: './resume-experience-tab.component.html',
  styleUrls: ['./resume-experience-tab.component.scss'],
})
export class ResumeExperienceTabComponent implements OnInit {
  @Input('form') resumeForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  // constructor(private dialog: MatDialog,) { }

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {}
  get experiencesArray() {
    return this.resumeForm.controls['Experiences'] as FormArray;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ResumeDialogExperience, {
      width: '500px',
      height: '620px',
    });

    dialogRef.afterClosed().subscribe((experience) => {
      this.experiencesArray.insert(0, this.fb.group(experience));
    });
  }

  next() {
    this.onChange.next(true);
  }
}

@Component({
  selector: 'resume-dialog-experience',
  templateUrl: 'resume-dialog-experience.html',
})
export class ResumeDialogExperience {
  @Input('form') resumeForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  experienceForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ResumeDialogExperience>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.experienceForm = this.fb.group({
      office: ['', Validators.required],
      companyName: ['', Validators.required],
      locality: [''],
      active: [false],
      startMonth:['', Validators.required],
      startYear:['', Validators.required],
      terminusMonth:['', Validators.required],
      terminusYear:['', Validators.required],
      sector: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.experienceForm.value);
  }
}
