import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'collaborator-language-dialog',
  templateUrl: 'collaborator-language-dialog.html',
  styleUrls: ['./collaborator-education-tab.component.scss'],
})
export class CollaboratorLanguageDialog {
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  languageForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CollaboratorLanguageDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.languageForm = this.fb.group({
      languageName: [null, [Validators.required, Validators.maxLength(40)]],
      degreeOfInfluence: [null, Validators.required],
    });
    if (this.data) {
      this.languageForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    const data = this.languageForm.getRawValue()
    this.dialogRef.close(data);
  }
}
