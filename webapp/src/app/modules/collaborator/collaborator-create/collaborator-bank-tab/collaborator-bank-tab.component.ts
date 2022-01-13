import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    return this.collaboratorForm.controls['bank'] as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.bankForm = this.fb.group({
      bank: ['', Validators.required],
      agency: ['', Validators.required],
      accountType: ['', Validators.required],
      accountNumber: ['', Validators.required],
      digit: ['', Validators.required],
      bankAccountDigit: ['', Validators.required],
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
    this.index = index;
    this.bankForm.patchValue(bankSelected);
  }

  deleteBank(index: number) {
    this.bankArray.removeAt(index);
  }
}
