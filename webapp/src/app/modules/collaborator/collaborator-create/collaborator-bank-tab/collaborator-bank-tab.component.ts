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
import { FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {
  MatDialog,

} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { CollaboratorBankDialog } from './collaborator-bank-dialog.component';

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

  bankForm!: FormGroup;

  index: any = null;
  Bank: any;

  get bankArray() {
    return this.collaboratorForm.controls['BankData'] as FormArray;
  }

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.bankArray.value.findIndex((bank: any) => bank == null) === -1) {
      this.data = this.bankArray.value;
    }

    this.initObservables();
  }

  initObservables() {
    this.bankArray.valueChanges.subscribe((res) => {
      const isNullIndex = this.bankArray.value.findIndex(
        (dependent: any) => dependent == null
      );
      if (isNullIndex !== -1) {
        this.bankArray.removeAt(isNullIndex);
      }
      if (res) {
        this.data = this.bankArray.value;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CollaboratorBankDialog, {
      width: '500px',
      height: '470px',
    });

    dialogRef.afterClosed().subscribe((bank) => {
      if (bank) {
        this.bankArray.controls[0].patchValue(bank);
        this.bankTable.renderRows();
      }
    });
  }

  next() {
    this.onChange.next(true);
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

  deleteBank(index: number) {
    this.bankArray.removeAt(index);
  }
}

