import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export interface collaboratorTypes {
  id: number;
  name: string;
}

@Component({
  selector: 'app-collaborator-register-tab',
  templateUrl: './collaborator-register-tab.component.html',
  styleUrls: ['./collaborator-register-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorRegisterTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  typeControl = new FormControl();

  types: collaboratorTypes[] = [
    { id: 1, name: 'CLT' },
    { id: 2, name: 'PJ' },
    { id: 3, name: 'Cooperado' },
  ];

  Office: any = [
    'Desenvolvedor NodeJS',
    'Desenvolvedor Angular',
    'Desenvolvedor React',
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.collaboratorForm) {
      this.collaboratorForm.controls[
        'collaboratorTypes'
      ].valueChanges.subscribe((res) => {
        console.log(
          '🚀 ~ file: collaborator-register-tab.component.ts ~ line 42 ~ CollaboratorRegisterTabComponent ~ ngOnInit ~ res',
          res
        );
      });
    }
  }

  next() {
    this.onChange.next(true);
  }
}
