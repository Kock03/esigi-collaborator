import {
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollaboratorBankProvider } from 'src/providers/collaborator-providers/collaborator-bank.provider';
import { ConfigProvider } from 'src/providers/config-provider';

@Component({
  selector: 'collaborator-bank-dialog',
  templateUrl: 'collaborator-bank-dialog.html',
  styleUrls: ['./collaborator-bank-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorBankDialog {
  @Input('form') collaboratorForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  banks: any[] = [];
  type: any[] = [];
  bankForm!: FormGroup;
  collaborator!: any;
  collaboratorId!: string | null;
  method!: string | null;
  bankId!: string | null;

  constructor(
    public dialogRef: MatDialogRef<CollaboratorBankDialog>,
    private fb: FormBuilder,
    private configProvider: ConfigProvider,

    private collaboratorBankProvider: CollaboratorBankProvider,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getKeysCollaborator();

    this.method = sessionStorage.getItem('method')!;
    this.collaboratorId = sessionStorage.getItem('collaborator_id')!;
    this.initForm();
  }

  initForm(): void {
    this.bankForm = this.fb.group({
      bank: ["", [Validators.required, Validators.maxLength(50)]],
      agency: [null, [Validators.required, Validators.maxLength(4)]],
      accountType: ["", Validators.required],
      accountNumber: [null, [Validators.required, Validators.maxLength(5)]],
      digit: [null],
      bankAccountDigit: [null, Validators.required],
      inactive: [false],
      Collaborator: { id: this.collaboratorId },
    });

    if (this.data) {
      this.bankForm.patchValue(this.data);
    }
  }

  async getKeysCollaborator() {
    let data = {
      key: ["banks", "account_types"]
    }
    const arrays = await this.configProvider.findKeys('collaborator', data)

    const keyList = arrays.reduce(function (array: any, register: any) {
      array[register.key] = array[register.key] || [];
      array[register.key].push({ id: register.id, value: register.value });
      return array;
    }, Object.create(null));
    this.banks = keyList['banks'];
    this.type = keyList['account_types']
  }

  onNoClick(): void {
    this.dialogRef.close();
    sessionStorage.removeItem('bank_id');
    sessionStorage.removeItem('method');
  }

  async save() {
    const data = this.bankForm.getRawValue();

    try {
      if (this.method === 'edit') {
        try {
          this.bankId = sessionStorage.getItem('bank_id');
          const updateBank = await this.collaboratorBankProvider.update(
            this.bankId,
            data
          );
        } catch (error: any) {
          console.log(error);
        }
      } else {
        const bank = await this.collaboratorBankProvider.store(data);
        sessionStorage.setItem('bank_id', bank.id);
      }
    } catch (error: any) {
      console.log(error);

      console.log('ERROR 132' + error);
    }

  }


  close() {
    this.dialogRef.close();
    sessionStorage.clear;
  }

}
