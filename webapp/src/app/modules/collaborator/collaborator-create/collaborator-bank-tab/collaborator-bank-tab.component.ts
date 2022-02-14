import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

export interface Bank {
  bank: string;
  agency: string;
  accountType: string;
  accountNumber: string;
  digit: string;
  bankAccountDigit: string;
}

@Component({
  selector: 'app-collaborator-bank-tab',
  templateUrl: './collaborator-bank-tab.component.html',
  styleUrls: ['./collaborator-bank-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorBankTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('bankTable') bankTable!: MatTable<any>;

  data: [] = [];

  displayedBank: string[] = [
    'bank',
    'agency',
    'accountType',
    'account',
    'icon',
  ];

  banks: Bank[] = [
    {
      bank: 'Banco do Brasil',
      agency: '',
      accountType: 'Conta Corrente',
      accountNumber: '',
      digit: '',
      bankAccountDigit: '',
    },
  ];

  selectedIndex = 0;

  bankForm!: FormGroup;

  index: any = null;
  Bank: any;

  get bankArray() {
    return this.collaboratorForm.controls['BankData'] as FormArray;
  }

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initForm();
    this.collaboratorForm.valueChanges.subscribe((res) => {
      console.log(res);

      this.data = this.bankArray.value;
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(CollaboratorBankDialog, {
      width: '500px',
      height: '470px',
    });

    dialogRef.afterClosed().subscribe((bank) => {
      if (bank) {
        this.bankArray.insert(0, this.fb.group(bank));
        this.bankTable.renderRows();
      }
    });
  }

  initForm(): void {
    this.bankForm = this.fb.group({
      bank: ['Banco do Brasil', Validators.required],
      agency: ['5464645', Validators.required],
      accountType: ['Conta Corrente', Validators.required],
      accountNumber: ['4365634', Validators.required],
      digit: ['4', Validators.required],
      bankAccountDigit: ['4', Validators.required],
    });
  }

  next() {
    this.onChange.next(true);
  }

  saveBank() {
    const data = this.bankForm.getRawValue();
    this.bankArray.insert(0, this.fb.group(data));
    this.bankTable.renderRows();
    this.bankForm.reset();
  }

  getBank(bankSelected: any, index: number) {
    const dialogRef = this.dialog.open(CollaboratorBankDialog, {
      width: '500px',
      height: '470px',
      data: { bankSelected },
    });
    this.index = index;
    dialogRef.afterClosed().subscribe((bank) => {
      this.bankArray.controls[this.index].setValue(bank);
    });
  }

  editbank() {
    this.bankArray.at(this.index).setValue(this.bankForm.getRawValue());
    this.bankTable.renderRows();
    this.bankForm.reset();
    this.index = null;
  }

  deleteBank(index: number) {
    this.bankArray.removeAt(index);
  }
}

@Component({
  selector: 'collaborator-bank-dialog',
  templateUrl: 'collaborator-bank-dialog.html',
})
export class CollaboratorBankDialog {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  bankForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CollaboratorBankDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { bankSelected: any }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.bankForm = this.fb.group({
      bank: ['Bradesco', [Validators.required, Validators.maxLength(50)]],
      agency: ['1111', [Validators.required, Validators.maxLength(4)]],
      accountType: [1, Validators.required],
      accountNumber: ['11111', [Validators.required, Validators.maxLength(5)]],
      digit: ['1', [Validators.required, Validators.maxLength(1)]],
      bankAccountDigit: ['1', [Validators.required, Validators.maxLength(1)]],
    });
    if (this.data && this.data.bankSelected) {
      this.bankForm.patchValue(this.data.bankSelected);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.bankForm.getRawValue());
  }
}
