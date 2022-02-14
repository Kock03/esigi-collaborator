import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Injectable,
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

import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core'
import { ApiGateway } from 'src/api-gateway';
import { CepService } from 'src/services/cep.service';

export interface collaboratorTypes {
  id: number;
  name: string;
}

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'numeric', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'numeric', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'numeric' }
  }
};

@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MM-yyyy', this.locale);;
    } else {
      return date.toDateString();
    }
  }
}

@Component({
  selector: 'app-collaborator-register-tab',
  templateUrl: './collaborator-register-tab.component.html',
  styleUrls: ['./collaborator-register-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
  ]
})
export class CollaboratorRegisterTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  selectedFile: any;
  date: any;

  onFileSelected(changes: any): void {

    this.selectedFile = changes.target.files[0]
    this.selectedFile = changes.target.files[0];

  }

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

  constructor(private fb: FormBuilder, private cepService: CepService) { }

  ngOnInit(): void {


    this.collaboratorForm.valueChanges.subscribe((res) => {
      const addressForm = this.collaboratorForm.controls[
        'Address'
      ] as FormGroup;

      addressForm.controls['cep'].valueChanges.subscribe((res) => {});
    });
  }

  ngAfterViewInit(): void { }

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
    const district = await this.cepService.findDistrict(
      address.cep.replace('-', '')
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
