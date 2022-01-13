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

export interface finance {
  dateInclusion: string;
  contractType: string;
  reason: string;
  value: string;
}


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

  displayedColumns: string[] = ['data', 'type', 'reason', 'value', 'monthlyValue', 'icon'];
 
  financials: finance[] = [
    {
      dateInclusion: '',
      contractType: 'CLT',
      reason: 'Contratação',
      value: '',
    },
  ];

  selectedIndex = 0;

  financeForm!: FormGroup;

  index: any = null;
  Finance: any;

  get financeArray() {
    return this.collaboratorForm.controls['finance'] as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  next() {
    this.onChange.next(true);
  }

  initForm(): void {
    this.financeForm = this.fb.group({
      dateInclusion: ['08/11/2021'],
      contractType: ['CLT'],
      reason: ['Contratação'],
      value: ['340000'],
    });
  }

  saveFinance() {
    const data = this.financeForm.getRawValue();
    this.financeArray.insert(0, this.fb.group(data));
    this.financeTable.renderRows();
    this.financeForm.reset();
  }

  getFinance(financeSelected: any, index: number) {
    this.index = index;
    this.financeForm.patchValue(financeSelected);
  }

  deleteFinance(index: number) {
    this.financeArray.removeAt(index);
  }
}
