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
import { CollaboratorBankProvider } from 'src/providers/collaborator-providers/collaborator-bank.provider';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';
import { CollaboratorBankDialog } from './collaborator-bank-dialog.component';

@Component({
  selector: 'app-collaborator-bank-tab',
  templateUrl: './collaborator-bank-tab.component.html',
  styleUrls: ['./collaborator-bank-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorBankTabComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('bankTable') bankTable!: MatTable<any>;

  data: [] = [];

  displayedBank: string[] = [
    'bank',
    'agency',
    'accountType',
    'account',
    'status',
    'icon',
  ];


  bank: any;
  method!: string;
  collaboratorId!: any;
  bankId!: string;
  collaboratorMethod!: string;

  constructor(
    private dialogService: ConfirmDialogService,
    public dialog: MatDialog,
    private snackbarService: SnackBarService,
    private collaboratorBankProvider: CollaboratorBankProvider,
    private collaboratorProvider: CollaboratorProvider
  ) {}

  ngOnInit(): void {
    this.collaboratorMethod = sessionStorage.getItem('collaborator_method')!;
    if (this.collaboratorMethod === 'edit') {
      this.getBankList();
    }
  }

  async getBankList() {
    this.collaboratorId = sessionStorage.getItem('collaborator_id');
    const data = await this.collaboratorProvider.findOne(this.collaboratorId);
    this.data = data.BankData;
  }



  openDialog() {
    this.method = 'add';
    sessionStorage.setItem('method', this.method);
    const dialogRef = this.dialog.open(CollaboratorBankDialog, {
      width: '500px',
      height: '470px',
    });
    dialogRef.afterClosed().subscribe(bank => {
      if (bank) {
        this.getBankList();
      }
    });
  }

  next() {
    this.onChange.next(true);
  }

  getBank(bankSelected: any, id: string) {
    this.method = 'edit';
    sessionStorage.setItem('method', this.method);
    this.bankId = id;
    sessionStorage.setItem('bank_id', this.bankId);
    const dialogRef = this.dialog.open(CollaboratorBankDialog, {
      width: '500px',
      height: '470px',
      data: bankSelected,
    });
    dialogRef.afterClosed().subscribe(bank => {
      if (bank) {
        this.getBankList();
      }
    });
  }

  deleteBank(id: string) {
    const options = {
      data: {
        title: 'Atenção',
        subtitle: 'Você tem certeza que deseja excluir essas informações?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async confirmed => {
      if (confirmed) {
        try {
          let deleteBank = await this.collaboratorBankProvider.destroy(id);
          this.getBankList();

          this.snackbarService.successMessage('Registro Excluido Com Sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Excluir');
        }
      }
    });
  }
}
