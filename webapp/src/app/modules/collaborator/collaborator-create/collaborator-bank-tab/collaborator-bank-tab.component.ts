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
  @Input() bankArray!: FormArray;
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

  index: any = null;
  bank: any;

  constructor(
    private fb: FormBuilder,
    private dialogService: ConfirmDialogService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.bankArray.value.length > 0) {
      this.data = this.bankArray.value;
    }

    this.initObservables();

    if (this.bankArray.value.status == true) {
    }
  }

  initObservables() {
    this.bankArray.valueChanges.subscribe(res => {
      const isNullIndex = this.bankArray.value.findIndex(
        (bank: any) => bank == null
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
    dialogRef.afterClosed().subscribe(bank => {
      if (bank) {
        this.bankArray.insert(0, this.fb.group(bank));
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
      data: bankSelected,
    });
    this.index = index;
    dialogRef.afterClosed().subscribe(bank => {
      if (bank) {
        this.checkBank(bank);
      }
    });
  }

  checkBank(bank: any) {
    if (bank.status) {
      const activeLength = this.bankArray.value.filter(
        (item: any) => item.status
      );
      if (activeLength.length > 1) {
        //  TODO - Exibir mensagem que não pode um banco ativo
      }
    } else {
      this.bankArray.controls[this.index].patchValue(bank);
    }
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

    this.dialogService.confirmed().subscribe(async confirmed => {
      if (confirmed) {
        this.bankArray.removeAt(index);
      }
    });
  }
}
