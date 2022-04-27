import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'collaborator-education-dialog',
  templateUrl: 'collaborator-education-dialog.html',
  styleUrls: ['./collaborator-education-tab.component.scss'],
})
export class CollaboratorEducationDialog {
  @Input('form') collaboratorForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  educationForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CollaboratorEducationDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.educationForm = this.fb.group({
      schooling: [null, Validators.required],
      situation: [null, Validators.required],

      course: [null, [Validators.required, Validators.maxLength(100)]],

      institution: [null, [Validators.required, Validators.maxLength(100)]],
    });
    if (this.data) {
      this.educationForm.patchValue(this.data);
    }
  }

  ngAfterViewInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    const data = this.educationForm.getRawValue();
    this.dialogRef.close(data);
  }
}
