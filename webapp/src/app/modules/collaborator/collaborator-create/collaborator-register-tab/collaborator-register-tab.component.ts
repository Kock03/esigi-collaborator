import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiGateway } from 'src/api-gateway';
import { CepService } from 'src/services/cep.service';


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

  constructor(private fb: FormBuilder, private cepService: CepService) {}

  ngOnInit(): void {
   
    this.collaboratorForm.valueChanges.subscribe((res) => {
      const addressForm = this.collaboratorForm.controls[
        'Address'
      ] as FormGroup;

      addressForm.controls['zipCode'].valueChanges.subscribe((res) => {
      });
    });
  }

  ngAfterViewInit(): void {}

  next() {
    this.onChange.next(true);
  }

  compareSelect(o1: any, o2: any): boolean {
    if (!o1 || !o2) {
      return false;
    }
    return o1.id === o2.id;
  }

  async getAddress() {
    const address = this.collaboratorForm.controls['Address'].value;
    console.log(address.cep);
    const district = await this.cepService.findDistrict(
      address.cep.replace('-', '')
    );
    console.log(
      '🚀 ~ file: collaborator-register-tab.component.ts ~ line 75 ~ CollaboratorRegisterTabComponent ~ getAddress ~ district',
      district
    );

    if (district.erro) {
      window.alert('Cep inválido');
      this.collaboratorForm.controls['Address'].reset();
    } else {
      this.collaboratorForm.controls['Address'].patchValue({
        cep: district.cep,
        city: district.localidade,
        street: district.logradouro,
        state: district.uf,
        district: district.bairro,
      });
    }
  }
}
