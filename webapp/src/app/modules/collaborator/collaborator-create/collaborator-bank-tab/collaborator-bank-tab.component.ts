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
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
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

  data!: Array<any>;

  displayedBank: string[] = [
    'bank',
    'agency',
    'accountType',
    'account',
    'icon',
  ]; 

  index: any = null;
  bank: any;

  get bankArray() {
    return this.collaboratorForm.controls['BankData'] as FormGroup;
  }
  get bankForm() {
    return this.collaboratorForm.controls['BankData'] as FormGroup;
  }

  constructor(
    private fb: FormBuilder,
    private dialogService: ConfirmDialogService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initObservables();
  }

  initObservables() {
    this.bank = this.collaboratorForm.controls['BankData'].value
    if   (this.bank.agency) {
      this.data = new Array(this.bank);
      this.bankTable.renderRows();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(CollaboratorBankDialog, {
      width: '500px',
      height: '470px',
      data: { bankForm: this.collaboratorForm.controls['BankData'] },
    });
    dialogRef.afterClosed().subscribe((bank) => {
      if (bank) {
        this.data = new Array(this.bankForm.value);
        this.bankTable.renderRows();
      }
    });
  }

  next() {
    this.onChange.next(true);
  }

  getBank(bankForm: any, index: number) {
    const dialogRef = this.dialog.open(CollaboratorBankDialog, {
      width: '500px',
      height: '470px',
      data: { bankForm: this.bankForm },
    });
    this.index = index;
    dialogRef.afterClosed().subscribe((bank) => {
      this.bankArray.controls[this.index].setValue(bank);
    });
  }

  deleteBank(index: number) {
    const options = {
      data: {
        title: 'Anteção',
        subtitle: 'Você tem certeza que deseja excluir essas informações?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async (confirmed) => {
      if (confirmed) {
        this.data.splice(0, 1);
        this.bankTable.renderRows();
      }
    });
  }
}
