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
import { ConfigProvider } from 'src/providers/config-provider';
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

  data: any[] = [];

  banks: any[] = [];
  type: any[] = [];

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
    private configProvider: ConfigProvider,

    private snackbarService: SnackBarService,
    private collaboratorBankProvider: CollaboratorBankProvider,
    private collaboratorProvider: CollaboratorProvider,
  ) { }

  ngOnInit(): void {
    this.getKeysCollaborator();
    this.collaboratorMethod = sessionStorage.getItem('collaborator_method')!;
    if (this.collaboratorMethod === 'edit') {
      this.getKeysCollaborator();

      this.getBankList();
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

  async getBankList() {
    this.collaboratorId = sessionStorage.getItem('collaborator_id');
    this.data = await this.collaboratorBankProvider.findByCollaborator(this.collaboratorId);
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.banks.length; j++) {
        if (this.data[i].bank === this.banks[j].id) {
          this.data[i].bank = this.banks[j].value
        }
      }
      for (let j = 0; j < this.type.length; j++) {
        if (this.data[i].accountType === this.type[j].id) {
          this.data[i].accountType = this.type[j].value
        }
      }
    }
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

  async getBank(bankSelected: any, id: string) {
    this.method = 'edit';
    sessionStorage.setItem('method', this.method);
    this.bankId = id;
    const bank = await this.collaboratorBankProvider.findOne(id);
    sessionStorage.setItem('bank_id', this.bankId);
    const dialogRef = this.dialog.open(CollaboratorBankDialog, {
      width: '500px',
      height: '470px',
      data: bank,
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
