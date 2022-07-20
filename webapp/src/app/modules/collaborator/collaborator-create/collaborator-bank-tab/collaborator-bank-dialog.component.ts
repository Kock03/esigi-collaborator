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

@Component({
  selector: 'collaborator-bank-dialog',
  templateUrl: 'collaborator-bank-dialog.html',
  styleUrls: ['./collaborator-bank-tab.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CollaboratorBankDialog {
  @Input('form') collaboratorForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  bankForm!: FormGroup;
  collaborator!: any;
  collaboratorId!: string | null;
  method!: string | null;
  bankId!: string | null;

  constructor(
    public dialogRef: MatDialogRef<CollaboratorBankDialog>,
    private fb: FormBuilder,
    private collaboratorBankProvider: CollaboratorBankProvider,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.method = sessionStorage.getItem('method')!;
    this.collaboratorId = sessionStorage.getItem('collaborator_id')!;
    this.initForm();
  }

  initForm(): void {
    this.bankForm = this.fb.group({
      bank: [null, [Validators.required, Validators.maxLength(50)]],
      agency: [null, [Validators.required, Validators.maxLength(4)]],
      accountType: [null, Validators.required],
      accountNumber: [null, [Validators.required, Validators.maxLength(5)]],
      digit: [null],
      bankAccountDigit: [null, [Validators.required, Validators.maxLength(1)]],
      status: [true, Validators.required],
      Collaborator: { id: this.collaboratorId },
    });

    if (this.data) {
      this.bankForm.patchValue(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
    sessionStorage.removeItem('bank_id');
    sessionStorage.removeItem('method');
  }

  async save() {
    const data = this.bankForm.getRawValue();
    if (!data.status) {
      data.status = false;
    }
    try {
      if (this.method === 'edit') {
        try {
          this.bankId = sessionStorage.getItem('bank_id');
          const updateBank = await this.collaboratorBankProvider.update(
            this.bankId,
            data
          );
          console.log(updateBank)
        } catch (error: any) {
          console.log(error);
        }
      }else{
        const bank = await this.collaboratorBankProvider.store(data);
        sessionStorage.setItem('bank_id', bank.id);
      }
    } catch (error: any) {
      console.log('ERROR 132' + error);
    }
   
  }
}
