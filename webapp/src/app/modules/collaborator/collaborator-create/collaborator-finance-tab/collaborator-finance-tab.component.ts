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

import {
  MatDialog,
} from '@angular/material/dialog';

import { MatTable } from '@angular/material/table';
import { CollaboratorFinanceDialog } from './collaborator-finance-dialog.component';

@Component({
  selector: 'app-collaborator-finance-tab',
  templateUrl: './collaborator-finance-tab.component.html',
  styleUrls: ['./collaborator-finance-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorFinanceTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
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

  index: any = null;
  Finance: any;

  get financeArray() {
    return this.collaboratorForm.controls['Financials'] as FormArray;
  }

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (
      this.financeArray.value.findIndex((finance: any) => finance == null) ===
      -1
    ) {
      this.data = this.financeArray.value;
    }
    this.initObservables();
  }

  initObservables() {
    this.financeArray.valueChanges.subscribe((res) => {
      const isNullIndex = this.financeArray.value.findIndex(
        (finance: any) => finance == null
      );
      if (isNullIndex !== -1) {
        this.financeArray.removeAt(isNullIndex);
      }
      if (res) {
        this.data = this.financeArray.value;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CollaboratorFinanceDialog, {
      width: '500px',
      height: '550px',
    });

    dialogRef.afterClosed().subscribe((finance) => {
      if (finance) {
        this.financeArray.insert(0, this.fb.group(finance));
        this.financeTable.renderRows();
      }
    });
  }

  next() {
    this.onChange.next(true);
  }

  getFinance(financeSelected: any, index: number) {
    const dialogRef = this.dialog.open(CollaboratorFinanceDialog, {
      width: '500px',
      height: '550px',
      data: { financeSelected },
    });

    this.index = index;
    dialogRef.afterClosed().subscribe((finance) => {
      this.financeArray.controls[this.index].setValue(finance);
    });
  }

  deleteFinance(index: number) {
    this.financeArray.removeAt(index);
  }
}

