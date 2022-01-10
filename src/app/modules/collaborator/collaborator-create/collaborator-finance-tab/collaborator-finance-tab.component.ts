import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface finans {
  data: string;
  type: string;
  reason: string;
  value: string;
  monthlyValue: string;
}

const ELEMENT_DATA: finans[] = [
  { data: '01/02/2022', type: 'Cooperado', reason: 'Contratação', value: '45,00', monthlyValue: '7.650,00'},
  { data: '01/02/2022', type: 'Cooperado', reason: 'Contratação', value: '45,00', monthlyValue: '7.650,00'},
  { data: '01/02/2022', type: 'Cooperado', reason: 'Contratação', value: '45,00', monthlyValue: '7.650,00'},
  { data: '01/02/2022', type: 'Cooperado', reason: 'Contratação', value: '45,00', monthlyValue: '7.650,00'},
  { data: '01/02/2022', type: 'Cooperado', reason: 'Contratação', value: '45,00', monthlyValue: '7.650,00'},
  { data: '01/02/2022', type: 'Cooperado', reason: 'Contratação', value: '45,00', monthlyValue: '7.650,00'},
  { data: '01/02/2022', type: 'Cooperado', reason: 'Contratação', value: '45,00', monthlyValue: '7.650,00'},
  { data: '01/02/2022', type: 'Cooperado', reason: 'Contratação', value: '45,00', monthlyValue: '7.650,00'},
  { data: '01/02/2022', type: 'Cooperado', reason: 'Contratação', value: '45,00', monthlyValue: '7.650,00'},
];

@Component({
  selector: 'app-collaborator-finance-tab',
  templateUrl: './collaborator-finance-tab.component.html',
  styleUrls: ['./collaborator-finance-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorFinanceTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = ['data', 'type', 'reason', 'value', 'monthlyValue', 'icon'];
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}

  next() {
    this.onChange.next(true);
  }
}
