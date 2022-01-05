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
  value: string;
}

const ELEMENT_DATA: finans[] = [
  { data: '01/02/2022', type: 'Cooperado', value: '45,00' },
  { data: '01/02/2022', type: 'Cooperado', value: '45,00' },
  { data: '01/02/2022', type: 'Cooperado', value: '45,00' },
  { data: '01/02/2022', type: 'Cooperado', value: '45,00' },
  { data: '01/02/2022', type: 'Cooperado', value: '45,00' },
  { data: '01/02/2022', type: 'Cooperado', value: '45,00' },
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

  displayedColumns: string[] = ['data', 'type', 'value'];
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}

  next() {
    this.onChange.next(true);
  }
}
