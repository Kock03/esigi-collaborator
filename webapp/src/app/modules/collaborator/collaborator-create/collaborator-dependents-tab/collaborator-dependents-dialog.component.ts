import { formatDate } from '@angular/common';
import {
  Injectable,
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateValidator } from 'src/app/validators/date.validator';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { CollaboratorDependentsProvider } from 'src/providers/collaborator-providers/collaborator-dependents.provider';
import { ConfigProvider } from 'src/providers/config-provider';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'numeric', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'numeric', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'numeric' },
  },
};

@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MM-yyyy', this.locale);
    } else {
      return date.toDateString();
    }
  }
}
@Component({
  selector: 'collaborator-dependents-dialog',
  templateUrl: 'collaborator-dependents-dialog.html',
  styleUrls: ['./collaborator-dependents-dialog.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class CollaboratorDependentsDialog {
  @Output() onChange: EventEmitter<any> = new EventEmitter();


  gender: any[] = []
  type: any[] = []
  dependentForm!: FormGroup;
  Date: any;
  collaboratorId!: string | null;
  method!: string | null;
  dependentId!: string | null;
  ddd!: number;
  constructor(
    public dialogRef: MatDialogRef<CollaboratorDependentsDialog>,
    private fb: FormBuilder,
    private configProvider: ConfigProvider,

    private collaboratorDependentsProvider: CollaboratorDependentsProvider,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getKeysCollaborator();
    this.method = sessionStorage.getItem('method')!;
    this.collaboratorId = sessionStorage.getItem('collaborator_id')!;
    this.ddd = Number(sessionStorage.getItem('ddd'))
    console.log(this.ddd)
    this.initForm();
  }

  initForm(): void {
    console.log(this.ddd)
    this.dependentForm = this.fb.group({
      type: ['', Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      gender: ["", Validators.required],
      cpf: [null, [DocumentValidator.isValidCpf()]],
      birthDate: this.fb.control({ value: ' ', disabled: false }, [DateValidator.isValidData(), Validators.required]),
      age: this.fb.control({ value: ' ', disabled: true }),
      ddi: [""],
      ddd: [null],
      phoneNumber: [null],
      email: [null, [Validators.email]],
      Collaborator: { id: this.collaboratorId },
    });
    if (this.data) {
      this.dependentForm.patchValue(this.data);
    } else {
      this.dependentForm.controls['ddd'].setValue(this.ddd)

    }
  }

  async getKeysCollaborator() {
    let data = {
      key: ["gender", "depentents"]
    }
    const arrays = await this.configProvider.findKeys('collaborator', data)

    const keyList = arrays.reduce(function (array: any, register: any) {
      array[register.key] = array[register.key] || [];
      array[register.key].push({ id: register.id, value: register.value });
      return array;
    }, Object.create(null));
    this.gender = keyList['gender'];
    this.type = keyList['depentents']
  }



  onNoClick(): void {
    this.dialogRef.close();
    sessionStorage.removeItem('dependent_id');
    sessionStorage.removeItem('method');
    console.log(this.dependentForm)
  }

  async save() {
    const data = this.dependentForm.getRawValue();
    if (this.method === 'add') {
      try {
        const dependent = await this.collaboratorDependentsProvider.store(data);
        sessionStorage.setItem('dependent_id', dependent.id);
      } catch (error: any) {
        console.log('ERROR 132' + error);
      }
    }
    if (this.method === 'edit') {
      try {
        this.dependentId = sessionStorage.getItem('dependent_id');
        const updateDependent = await this.collaboratorDependentsProvider.update(
          this.dependentId,
          data
        );
        console.log(updateDependent)
      } catch (error: any) {
        console.log(error);
      }
    }

  }

  setValueYears() {
    let data = this.dependentForm.controls['birthDate'].value.split('/').reverse().join('/')

    const today = new Date();
    const birthDate = new Date(data);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (Number.isNaN(data) || Number.isNaN(age)) {
      age = 0
    }
    this.dependentForm.controls['age'].setValue(
      age
    );


  }


  close() {
    this.dialogRef.close();
    sessionStorage.clear;
  }
}

