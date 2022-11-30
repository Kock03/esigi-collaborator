import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollaboratorSkillProvider } from 'src/providers/collaborator-providers/collaborator-skill.provider';
import { ConfigProvider } from 'src/providers/config-provider';
import { SnackBarService } from 'src/services/snackbar.service';

@Component({
  selector: 'collaborator-skill-dialog',
  templateUrl: 'collaborator-skill-dialog.html',
})
export class CollaboratorSkillDialog {
  @Input('form') collaboratorForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  skillForm!: FormGroup;
  method!: string;
  collaboratorId!: string | null;
  skillId!: string | null;
  seniority: any[] = [];
  technologies: any[] = [];


  constructor(
    public dialogRef: MatDialogRef<CollaboratorSkillDialog>,
    private fb: FormBuilder,
    private configProvider: ConfigProvider,

    private collaboratorSkillProvider: CollaboratorSkillProvider,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getKeysCollaborator()
    this.method = sessionStorage.getItem('method')!;
    this.collaboratorId = sessionStorage.getItem('collaborator_id')!;
    this.initForm();
  }

  initForm(): void {
    this.skillForm = this.fb.group({
      technology: [null, [Validators.required, Validators.maxLength(50)]],
      seniority: [null, Validators.required],
      yearsExperience: [null, [Validators.required, Validators.maxLength(2)]],
      currentPosition: [false, Validators.required],
      inactive: [false, Validators.required],
      typeOfPeriod: [null, Validators.required],
      Collaborator: { id: this.collaboratorId },
    });
    if (this.data) {
      this.skillForm.patchValue(this.data);
    }
  }

  async getKeysCollaborator() {
    let data = {
      key: ["seniority", "technologies"]
    }
    const arrays = await this.configProvider.findKeys('collaborator', data)

    const keyList = arrays.reduce(function (array: any, register: any) {
      array[register.key] = array[register.key] || [];
      array[register.key].push({ id: register.id, value: register.value });
      return array;
    }, Object.create(null));
    this.seniority = keyList['seniority']
    this.technologies = keyList['technologies']

  }

  onNoClick(): void {
    this.dialogRef.close();
    sessionStorage.removeItem('skill_id');
    sessionStorage.removeItem('method');
  }

  async save() {
    const data = this.skillForm.getRawValue();
    if (this.method === 'add') {
      try {
        const skill = await this.collaboratorSkillProvider.store(data);
        sessionStorage.setItem('skill_id', skill.id);
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
    if (this.method === 'edit') {
      try {
        this.skillId = sessionStorage.getItem('skill_id');
        const updateSkill = await this.collaboratorSkillProvider.update(
          this.skillId,
          data
        );
      } catch (error: any) {
        console.log(error)
      }
    }
  }

  close() {
    this.dialogRef.close();
    sessionStorage.clear;
  }
}
