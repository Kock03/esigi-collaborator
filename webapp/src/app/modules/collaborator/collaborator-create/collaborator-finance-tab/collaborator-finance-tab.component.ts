import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
} from '@angular/material/core';

import { MatDialog } from '@angular/material/dialog';

import { MatTable } from '@angular/material/table';
import { CollaboratorFinanceProvider } from 'src/providers/collaborator-providers/collaborator-finance.provider';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';
import { CollaboratorFinanceDialog } from './collaborator-finance-dialog.component';

@Component({
  selector: 'app-collaborator-finance-tab',
  templateUrl: './collaborator-finance-tab.component.html',
  styleUrls: ['./collaborator-finance-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorFinanceTabComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('financeTable') financeTable!: MatTable<any>;

  displayedColumns: string[] = [
    'data',
    'type',
    'reason',
    'value',
    'monthlyValue',
    'icon',
  ];

  data: [] = [];

  selectedIndex = 0;

  financeForm!: FormGroup;

  Finance: any;
  method!: string;
  collaboratorId!: any;
  fnanceId!: string;
  collaboratorMethod!: string;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private collaboratorFinanceProvider: CollaboratorFinanceProvider,
    private dialogService: ConfirmDialogService, private snackbarService: SnackBarService,
    private collaboratorProvider: CollaboratorProvider,
  ) { }

  ngOnInit(): void {
    this.collaboratorMethod = sessionStorage.getItem('collaborator_method')!;
    if (this.collaboratorMethod === 'edit') {
      this.getFinanceList();
    }
  }


  async getFinanceList() {
    this.collaboratorId = sessionStorage.getItem('collaborator_id');
    this.data = await this.collaboratorFinanceProvider.findByCollaborator(this.collaboratorId);
  }



  openDialog() {
    this.method = 'add';
    sessionStorage.setItem('method', this.method);
    const dialogRef = this.dialog.open(CollaboratorFinanceDialog, {
      width: '500px',
      height: '550px',
    });

    dialogRef.afterClosed().subscribe(finance => {
      if (finance) {
        this.getFinanceList();
      }
    });
  }

  next() {
    this.onChange.next(true);
  }

  getFinance(financeSelected: any, id: string) {
    this.method = 'edit';
    sessionStorage.setItem('method', this.method);
    this.fnanceId = id;
    sessionStorage.setItem('skill_id', this.fnanceId);
    const dialogRef = this.dialog.open(CollaboratorFinanceDialog, {
      width: '500px',
      height: '550px',
      data: financeSelected,
    });

    dialogRef.afterClosed().subscribe(finance => {
      if (finance) {
        this.getFinanceList();
      }
    });
  }

  deleteFinance(id: string) {
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
          let deleteFinance = await this.collaboratorFinanceProvider.destroy(id);
          this.getFinanceList();

          this.snackbarService.successMessage('Registro excluido com sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao excluir');
        }
      }
    });
  }
}
