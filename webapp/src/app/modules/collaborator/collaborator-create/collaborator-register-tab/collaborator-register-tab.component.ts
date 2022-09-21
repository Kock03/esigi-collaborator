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
  country!: FormControl;
  file!: any;
  view!: boolean;
  searchEnabled!: boolean;

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private collaboratorProvider: CollaboratorProvider,
  ) {}

 async ngOnInit() {
  this.searchEnabled = false;
    this.collaboratorId = this.route.snapshot.paramMap.get('id');
    if (this.collaboratorId == 'novo') {
      this.url = '../../../../assets/logo/profile-icon.png';
      this.view = true;
      this.collaboratorForm.valueChanges.subscribe(res => {
        const addressForm = this.collaboratorForm.controls[
          'Address'
        ] as FormGroup;
        this.addressForm = addressForm;
        addressForm.controls['cep'].valueChanges.subscribe(res => {});

        const phoneForm = this.collaboratorForm.controls['Phone'] as FormGroup;
        this.phoneForm = phoneForm;
        phoneForm.controls['ddi'].valueChanges.subscribe(res => {});
      });
    } else {
      let collaborator = await this.collaboratorProvider.findOne(
        this.collaboratorId
      );
      this.url = 'http://localhost:3000/' + collaborator.photo
      this.view = false;
      this.changesType(
        this.collaboratorForm.controls['collaboratorTypes'].value
      );

    }
  }

  onCountrySelected(country: any) {
    if(this.collaboratorId == 'novo'){
      if(country.name === 'Brasil'){
        this.searchEnabled = true;
      }else{
        this.searchEnabled = false;
      }
      this.collaboratorForm.controls['Address'].patchValue(
        {
          country: country.name
        }
      )
    }else{
      
    }

  }

  ngAfterViewInit(): void {}

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
        .post('http://localhost:3000', formData)
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
