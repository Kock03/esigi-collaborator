import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { ApiGateway } from 'src/api-gateway';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { CepService } from 'src/services/cep.service';

@Component({
  selector: 'app-collaborator-register-tab',
  templateUrl: './collaborator-register-tab.component.html',
  styleUrls: ['./collaborator-register-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorRegisterTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Input('country') countryControl!: FormControl;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  selectedFile: any;
  date: any;
  url: any;
  collaboratorId!: string | null;
  collaborator!: any;
  typeControl = new FormControl();
  addressForm!: FormGroup;
  phoneForm!: FormGroup;
  Country!: any;
  token!: string;
  file!: any;
  view!: boolean;
  searchEnabled!: boolean;
  defaultValue: any;

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private collaboratorProvider: CollaboratorProvider,
  ) { }

  async ngOnInit() {
    this.token = localStorage.getItem('token')!;
    this.searchEnabled = false;
    this.collaboratorId = this.route.snapshot.paramMap.get('id');
    if (this.collaboratorId == 'novo') {
      this.url = '../assets/icons/avatar-astronauta.png';
      this.view = true;
      this.collaboratorForm.valueChanges.subscribe(res => {
        const addressForm = this.collaboratorForm.controls[
          'Address'
        ] as FormGroup;
        this.addressForm = addressForm;
        addressForm.controls['cep'].valueChanges.subscribe(res => { });

        const phoneForm = this.collaboratorForm.controls['Phone'] as FormGroup;
        this.phoneForm = phoneForm;
        phoneForm.controls['ddi'].valueChanges.subscribe(res => { });
      });
    } else {
      let collaborator = await this.collaboratorProvider.findOne(
        this.collaboratorId
      );
      this.url = `http://localhost:3000/${collaborator.photo}` 
      this.view = false;
      this.changesType(
        this.collaboratorForm.controls['collaboratorTypes'].value
      );

      this.defaultValue = {
        name: sessionStorage.getItem('country_value'),
        alpha2Code: sessionStorage.getItem('flag_value')

      };

    }
  // this.url =  this.httpClient
  //   .get(`http://localhost:3000/permiss%C3%83%C2%B5es_1664382905117.png.${this.token}`, {
  //     headers: {
  //       authorization: `Bearer ${this.token}`,
  //     },
  //   },)
  //   .subscribe(resposta => {
  //     if (resposta) {
  //     console.log("🚀 ~ file: collaborator-register-tab.component.ts ~ line 107 ~ CollaboratorRegisterTabComponent ~ ngOnInit ~ resposta", resposta)
      
  //     }
  //   });
  // console.log("🚀 ~ file: collaborator-register-tab.component.ts ~ line 111 ~ CollaboratorRegisterTabComponent ~ ngOnInit ~  this.url = ",  this.url )
  }

  onCountrySelected(country: any) {
    console.log(country)
    if (this.collaboratorId == 'novo') {
      if (country.name === 'Brasil') {
        this.view = true;
        this.searchEnabled = true;
      } else {
        this.view = false;
        this.searchEnabled = false;
      }

      this.collaboratorForm.controls['Address'].patchValue(
        {
          country: country.name,
          flag: country.alpha2Code
        }
      )
    } else {
      this.defaultValue = {
        name: country.name,
        alpha2Code: country.alpha2Code

      };
      console.log(this.defaultValue + " d")
      this.collaboratorForm.controls['Address'].patchValue(
        {
          country: this.defaultValue.name,
          flag: this.defaultValue.alpha2Code
        }
      )
    }
  }

  ngAfterViewInit(): void { }

  next() {
    this.onChange.next(true);
  }

  changesType(value: number) {
    if (this.collaboratorForm.controls['collaboratorTypes'].value === 2) {
      this.collaboratorForm.controls['cpf'].removeValidators(
        Validators.required
      );
      this.collaboratorForm.controls['cpf'].updateValueAndValidity();
    } else {
      this.collaboratorForm.controls['cnpj'].removeValidators(
        Validators.required
      );
      this.collaboratorForm.controls['cnpj'].updateValueAndValidity();
      this.collaboratorForm.controls['cpf'].addValidators(Validators.required);
    }
  }

  setValueLogin() {
    if (this.collaboratorForm.controls['collaboratorTypes'].value === 2) {
      this.collaboratorForm.controls['login'].setValue(
        `${this.collaboratorForm.controls['firstNameCorporateName'].value}@Envolti.com.br`
      );
    } else {
      if (
        this.collaboratorForm.controls['firstNameCorporateName'].value !=
        null &&
        this.collaboratorForm.controls['lastNameFantasyName'].value != null
      ) {
        this.collaboratorForm.controls['login'].setValue(
          `${this.collaboratorForm.controls['firstNameCorporateName'].value}.${this.collaboratorForm.controls['lastNameFantasyName'].value}@Envolti.com.br`
        );
      }
    }
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
      this.view = true;
    } else {
      this.view = false;
      this.collaboratorForm.controls['Address'].patchValue({
        cep: district.cep,
        city: district.localidade,
        street: district.logradouro,
        state: district.uf,
        district: district.bairro,
      });
    }
  }

  fileChanged(event: any) {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
      this.httpClient
        .post('http://localhost:3000', formData, {
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        },)
        .subscribe(resposta => {
          if (resposta) {
            this.file = resposta;
            this.collaboratorForm.controls['photo'].setValue(
              this.file.filename
            );
            this.url = 'http://localhost:3000/' + this.file.filename;
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  collaboratorIsActive() {
    if (this.collaborator.active == true) {
      this.collaborator.active = 'inativo';
    } else {
      this.collaborator.active = 'ativo';
    }
  }
}
