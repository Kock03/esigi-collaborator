import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobCreateComponent implements OnInit {
  jobForm!: FormGroup;


  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.jobForm = this.fb.group({
      test: ['', Validators.required],
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(JobDialogSkill, {
      width: '250px',
    });
     
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      });
  }
}

@Component({
  selector: 'job-dialog-skill',
  templateUrl: 'job-dialog-skill.html',
})
export class JobDialogSkill {
  constructor(
    private dialogRef: MatDialogRef<JobDialogSkill>,
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }
}


