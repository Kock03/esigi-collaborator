import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-collaborator-register-tab',
  templateUrl: './collaborator-register-tab.component.html',
  styleUrls: ['./collaborator-register-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorRegisterTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  CollaboratorType: any = ['CLT', 'PJ', 'Cooperado'];

  Office: any = ['Desenvolvedor NodeJS', 'Desenvolvedor Angular', 'Desenvolvedor React']

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  next() {
    this.onChange.next(true);
  }

}
