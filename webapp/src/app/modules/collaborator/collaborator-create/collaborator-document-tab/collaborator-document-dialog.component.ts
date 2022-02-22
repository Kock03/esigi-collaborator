import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'collaborator-document-dialog',
  templateUrl: 'collaborator-document-dialog.html',
  styleUrls: ['./collaborator-document-tab.component.scss'],
})
export class CollaboratorDocumentDialog {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  documentForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CollaboratorDocumentDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { documentSelected: any }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.documentForm = this.fb.group({
      name: ['RG', Validators.required],
      file: [''],
    });
    if (this.data && this.data.documentSelected) {
      this.documentForm.patchValue(this.data.documentSelected);
    }
  }
  fileChanged(file: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.documentForm.patchValue({
        file: reader.result,
      });
    };
    reader.readAsText(file.target.files[0]);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async save() {
    this.dialogRef.close(this.documentForm.getRawValue());
  }
}
