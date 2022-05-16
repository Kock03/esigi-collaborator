import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollaboratorDocumentProvider } from 'src/providers/collaborator-providers/collaborator-document.provider';

@Component({
  selector: 'collaborator-document-dialog',
  templateUrl: 'collaborator-document-dialog.html',
  styleUrls: ['./collaborator-document-tab.component.scss'],
})
export class CollaboratorDocumentDialog {
  @Input('form') collaboratorForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  documentForm!: FormGroup;
  url: any;
  method!: string;
  collaboratorId!: string | null;
  documentId!: string | null;


  constructor(
    public dialogRef: MatDialogRef<CollaboratorDocumentDialog>,
    private collaboratorDocumentProvider: CollaboratorDocumentProvider,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.method = sessionStorage.getItem('method')!;
    this.collaboratorId = sessionStorage.getItem('collaborator_id')!;
    this.initForm();
  }

  initForm(): void {
    this.documentForm = this.fb.group({
      name: [null, Validators.required],
      file: [null],
      Collaborator: { id: this.collaboratorId },
    });
    if (this.data) {
      this.documentForm.patchValue(this.data);
    }
  }

  fileChanged(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = _file => {
      this.url = reader.result;
      this.documentForm.patchValue({
        file: reader.result,
      });
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
    sessionStorage.removeItem('document_id');
    sessionStorage.removeItem('method');
  }

  async save() {
    const data = this.documentForm.getRawValue();
    if (this.method === 'add') {
      try {
        const document = await this.collaboratorDocumentProvider.store(data);
        sessionStorage.setItem('document_id', document.id);
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
    if (this.method === 'edit') {
      try {
        this.documentId = sessionStorage.getItem('document_id');
        const updateSkill = await this.collaboratorDocumentProvider.update(
          this.documentId,
          data
        );
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
  }
}
