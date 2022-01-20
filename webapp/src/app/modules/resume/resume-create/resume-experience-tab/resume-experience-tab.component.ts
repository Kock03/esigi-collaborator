import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-resume-experience-tab',
  templateUrl: './resume-experience-tab.component.html',
  styleUrls: ['./resume-experience-tab.component.scss']
})
export class ResumeExperienceTabComponent implements OnInit {
  @Input('form') resumeForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(JobDialogSkill, {
  //     width: '450px',
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed');
  //   });
  // }

  openDialog() {
    const dialogRef = this.dialog.open(ResumeDialogExperience);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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
  constructor(private dialogRef: MatDialogRef<ResumeDialogExperience>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}