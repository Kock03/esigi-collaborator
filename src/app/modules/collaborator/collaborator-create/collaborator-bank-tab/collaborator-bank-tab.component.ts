import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface bank {
  bank: string;
  agency: string;
  accountType: string;
  account: string;
}

const ELEMENT_BANK: bank[] = [
  { bank: 'Banco do Brasil', agency: '525-1', accountType: 'Conta Corrente', account: '125125-9'},
];

@Component({
  selector: 'app-collaborator-bank-tab',
  templateUrl: './collaborator-bank-tab.component.html',
  styleUrls: ['./collaborator-bank-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorBankTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  displayedBank: string[] = ['bank', 'agency', 'accountType', 'account', 'icon'];
  dataBank = ELEMENT_BANK;

  constructor() {}

  ngOnInit(): void {}

  next() {
    this.onChange.next(true);
  }
}
