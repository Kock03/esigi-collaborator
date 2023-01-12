import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollaboratorDocumentProvider } from 'src/providers/collaborator-providers/collaborator-document.provider';

@Component({
  selector: 'collaborator-document-dialog',
  templateUrl: 'collaborator-image-dialog.component.html',
})
export class CollaboratorImageDialog {

  fileName!: string

  constructor(
    public dialogRef: MatDialogRef<CollaboratorImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.fileName = 'http://https://viniciuskock.com:3000/' + this.data
    if (this.fileName === '.pdf') {
      console.log('deu certo')
    }
  }

}
