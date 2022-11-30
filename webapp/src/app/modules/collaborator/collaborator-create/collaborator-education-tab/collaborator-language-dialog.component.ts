import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollaboratorLanguageProvider } from 'src/providers/collaborator-providers/collaborator-language.provider';
import { ConfigProvider } from 'src/providers/config-provider';

@Component({
  selector: 'collaborator-language-dialog',
  templateUrl: 'collaborator-language-dialog.html',
  styleUrls: ['./collaborator-education-tab.component.scss'],
})
export class CollaboratorLanguageDialog {
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  languageForm!: FormGroup;
  method!: string;
  collaboratorId!: string | null;
  languageId!: string | null;
  language: any[] = [];
  degreeOfInfluence: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CollaboratorLanguageDialog>,
    private fb: FormBuilder,
    private configProvider: ConfigProvider,
    private collaboratorLanguageProvider: CollaboratorLanguageProvider,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getKeysGeneric();
    this.method = sessionStorage.getItem('method')!;
    this.collaboratorId = sessionStorage.getItem('collaborator_id')!;
    this.initForm();
  }

  initForm(): void {
    this.languageForm = this.fb.group({
      languageName: [null, [Validators.required, Validators.maxLength(40)]],
      degreeOfInfluence: [null, Validators.required],
      Collaborator: { id: this.collaboratorId },
    });
    if (this.data) {
      this.languageForm.patchValue(this.data);
    }
  }

  async getKeysGeneric() {
    let data = {
      key: ["language_level", "fluency_degree"]
    }
    const arrays = await this.configProvider.findKeys('generic', data)

    const keyList = arrays.reduce(function (array: any, register: any) {
      array[register.key] = array[register.key] || [];
      array[register.key].push({ id: register.id, value: register.value });
      return array;
    }, Object.create(null));
    this.language = keyList['language_level'];
    this.degreeOfInfluence = keyList['fluency_degree']
  }

  onNoClick(): void {
    this.dialogRef.close();
    sessionStorage.removeItem('language_id');
    sessionStorage.removeItem('method');
  }

  async save() {
    const data = this.languageForm.getRawValue();
    if (this.method === 'add') {
      try {
        const language = await this.collaboratorLanguageProvider.store(data);
        sessionStorage.setItem('language_id', language.id);
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
    if (this.method === 'edit') {
      try {
        this.languageId = sessionStorage.getItem('language_id');
        const updateLanguage = await this.collaboratorLanguageProvider.update(
          this.languageId,
          data
        );
      } catch (error: any) {
        console.log(error);
      }
    }
  }

  close() {
    this.dialogRef.close();
    sessionStorage.clear;
  }
}
