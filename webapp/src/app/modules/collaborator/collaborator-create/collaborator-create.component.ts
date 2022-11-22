import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';
import { DateValidator } from 'src/app/validators/date.validator';

import { DocumentValidator } from 'src/app/validators/document.validator';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { UserProvider } from 'src/providers/user.provider';
import { RequireMatch } from 'src/services/autocomplete.service';
import { CepService } from 'src/services/cep.service';
import { SnackBarService } from 'src/services/snackbar.service';
import { StatesAndCities } from 'src/services/states-cities.service';

@Component({
  selector: 'app-collaborator-create',
  templateUrl: './collaborator-create.component.html',
  styleUrls: ['./collaborator-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorCreateComponent implements OnInit {
  collaboratorForm!: FormGroup;
  userForm!: FormGroup;
  step: any = 1;
  collaboratorId!: string | null;
  collaborator!: any;
  active: boolean = true;
  countryControl = new FormControl('', [Validators.required, RequireMatch]);
  country: any;
  loginControl = new FormControl();
  cityControl = new FormControl('', [Validators.required, RequireMatch]);
  method: any;
  Educations: any;
  Languages: any;
  BankData: any;
  Financials: any;
  Skills: any;
  Documents: any;
  Feedbacks: any;
  Dependents: any;
  controllers: any;
  url!: string;
  urlStep!: number;
  valid!: boolean;
  typeOfContract!: any;
  city!: string | null;
  view!: boolean;
  addressForm!: FormGroup;
  data!: any;
  validations = [
    [
      'admissionDate',
      'firstNameCorporateName',
      'lastNameFantasyName',
      'login',
      'gender',
      'maritalStatus',
      'office',
      'collaboratorTypes',
      'inactive',
      'birthDate',
      'email',
      'Phone',
      'Address'
    ],

  ];
  cityList: Array<any> = [];;

  constructor(
    private fb: FormBuilder,
    private collaboratorProvider: CollaboratorProvider,
    private userProvider: UserProvider,
    private router: Router,
    private snackbarService: SnackBarService,
    private route: ActivatedRoute,
    private cepService: CepService,
    private statesAndCities: StatesAndCities
  ) { }

  async ngOnInit(): Promise<void> {
    if (sessionStorage.getItem('collaborator_tab') == undefined) {
      sessionStorage.setItem('collaborator_tab', '1');
    }

    this.country = sessionStorage.getItem('country_value')
    this.collaboratorId = this.route.snapshot.paramMap.get('id');
    this.step = JSON.parse(sessionStorage.getItem('collaborator_tab')!);

    if (this.collaboratorId !== 'novo') {
      await this.getCollaborator();
      this.initForm();
      this.setFormValue();
    } else {
      this.initForm();
    }
  }

  async getCollaborator() {
    try {
      this.collaborator = await this.collaboratorProvider.findOne(
        this.collaboratorId
      );
      console.log("🚀 ~ file: collaborator-create.component.ts ~ line 96 ~ CollaboratorCreateComponent ~ getCollaborator ~ collaborator", this.collaborator)
      sessionStorage.setItem('type', this.collaborator.collaboratorTypes)
      // this.collaboratorForm.controls['city'].setValue(this.collaborator.city)

    } catch (error) {
      console.error(error);
    }
  }

  listCollaborator() {
    this.router.navigate(['colaborador/lista']);
    sessionStorage.clear();
  }

  async editCollaborator() {
    let data = this.collaboratorForm.getRawValue();
    try {
      const job = await this.collaboratorProvider.update(
        this.collaboratorId,
        data
      );
      this.router.navigate(['colaborador/lista']);
      this.snackbarService.successMessage(
        'Colaborador atualizado com sucesso!'
      );
    } catch (err: any) {
      this.snackbarService.showError(
        err.error?.message ?? 'Ocorreu um erro, tente novamente'
      );
    }
  }

  async initForm() {
    this.collaboratorForm = this.fb.group({
      firstNameCorporateName: [null, Validators.required],
      lastNameFantasyName: [null, Validators.required],
      login: [null, Validators.required],
      userId: [null],
      gender: [null, Validators.required],
      maritalStatus: [null, Validators.required],
      office: ['', Validators.required],
      collaboratorTypes: [null, Validators.required],
      inactive: [false, Validators.required],
      cpf: this.fb.control({ value: null, disabled: false }, [
        DocumentValidator.isValidCpf(), Validators.required
      ]),
      birthDate: this.fb.control({ value: ' ', disabled: false }, [DateValidator.isValidData(), Validators.required]),
      admissionDate: this.fb.control({ value: new Date().toLocaleDateString(), disabled: false }, [DateValidator.isValidData(), Validators.required]),
      email: [null, [Validators.email, Validators.required]],
      cnpj: this.fb.control({ value: null, disabled: false }, [
        DocumentValidator.isValidCnpj(), Validators.required
      ]),
      stateRegistration: [null],
      municipalInscription: [null],
      site: [null],
      linkedin: [null],
      photo: [null],
      Phone: this.fb.group({
        phoneNumber: [null, [Validators.required, Validators.maxLength(9)]],
        ddd: [null, [Validators.required, Validators.maxLength(2)]],
        ddi: [null, Validators.required],
      }),

      Address: this.fb.group({
        country: ['', Validators.required],
        flag: ['', Validators.required],
        cep: ['', Validators.required],
        number: ['', Validators.required],
        complement: [''],
        street: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        district: ['', Validators.required],
      }),
    });
  }

  setFormValue() {
    if (this.collaborator) {
      this.collaboratorForm.patchValue(this.collaborator);
      this.collaboratorForm.controls['Address'].patchValue({
        cep: this.collaborator?.Address.cep,
        state: this.collaborator?.Address.state,
        city: this.collaborator?.Address.city,
        street: this.collaborator?.Address.street,
        district: this.collaborator?.Address.district,
      })
      this.searchCities({ value: this.collaborator?.Address.state })

      // this.collaboratorForm.patchValue(this.city);
      console.log("🚀 ~ file: collaborator-create.component.ts ~ line 176 ~ CollaboratorCreateComponent ~ setFormValue ~ collaborator", this.collaborator)
    }
  }

  // async getAddress() {
  //   const address = this.collaboratorForm.controls['Address'].value;
  //   console.log("🚀 ~ file: collaborator-create.component.ts ~ line 195 ~ CollaboratorCreateComponent ~ getAddress ~ address", address)
  //   // const district = await this.cepService.findDistrict(
  //   //   address.cep.replace('-', '')
  //   // );
  //   // this.collaboratorForm.controls['Address'].patchValue({
  //   //   cep: address.cep,
  //   //   city: address.localidade,
  //   //   street: address.logradouro,
  //   //   state: address.uf,
  //   //   district: address.bairro,
  //   //   });
  //   //   this.searchCities({value: address.uf})
  //   this.data = await this.cepService.searchCep(address.cep);
  //   console.log("🚀 ~ file: collaborator-create.component.ts ~ line 208 ~ CollaboratorCreateComponent ~ getAddress ~ this.data", this.data)
  //   if (this.data.erro) {
  //     window.alert('Cep inválido');
  //     this.collaboratorForm.controls['Address'].reset();
  //     this.view = true;
  //   } else {
  //     this.view = false;
  //     // this.collaboratorForm.controls['Address'].patchValue({
  //     //   cep: district.cep,
  //     //   city: district.localidade,
  //     //   street: district.logradouro,
  //     //   state: district.uf,
  //     //   district: district.bairro,
  //     // this.data = await this.cepService.searchCep(this.addressForm.controls['cep'].value);
  //     this.collaboratorForm.controls['Address'].patchValue({
  //       cep: this.data.cep,
  //       city: this.data.localidade,
  //       street: this.data.logradouro,
  //       state: this.data.uf,
  //       district: this.data.bairro,
  //     });
  //     this.searchCities({ value: this.data.uf })
  //     console.log("🚀 ~ file: collaborator-register-tab.component.ts ~ line 219 ~ CollaboratorRegisterTabComponent ~ getAddress ~ data", this.data)

  //   }
  // }

  searchCities(e: any) {
    const city = document.querySelector('#cities') as HTMLSelectElement;
    let state_number = this.statesAndCities.json_cities.estados.length;
    let j_index = -1;
    for (var x = 0; x < state_number; x++) {
      if (this.statesAndCities.json_cities.estados[x].sigla == e.value) {
        j_index = x;
      }
    }
    let line = {};
    let arrayCity = Array<any>();
    if (j_index != -1) {
      this.statesAndCities.json_cities.estados[j_index].cidades.forEach(
        cities => {
          line = cities;
          arrayCity.push(line);
        }
      );
      this.cityList = arrayCity;
    } else {
      city.innerHTML = '';
    }
  }


  async saveCollaborator() {
    let data = this.collaboratorForm.getRawValue();

    try {

      const colaborator = await this.collaboratorProvider.store(data);

      if (colaborator.collaboratorTypes === 2) {
        this.userForm = this.fb.group({
          firstName: colaborator.firstNameCorporateName,
          lastName: colaborator.lastNameFantasyName,
          email: colaborator.email,
          login: colaborator.login,
          password: colaborator.cnpj,
          collaboratorId: colaborator.id,
          office: colaborator.office,
          inactive: colaborator.inactive,
        })
      } else {
        this.userForm = this.fb.group({
          firstName: colaborator.firstNameCorporateName,
          lastName: colaborator.lastNameFantasyName,
          email: colaborator.email,
          login: colaborator.login,
          collaboratorId: colaborator.id,
          password: colaborator.cpf,
          office: colaborator.office,
          inactive: colaborator.inactive,
        })
      }
      let dataUser = this.userForm.getRawValue();
      const user = await this.userProvider.store(dataUser);
      this.collaboratorForm.controls['userId'].setValue(user.id)
      let idUser = this.collaboratorForm.getRawValue();
      try {
        await this.collaboratorProvider.update(
          colaborator.id,
          idUser,
        );
      } catch (error: any) {
        console.log(error);
      }
      sessionStorage.setItem('collaborator_id', colaborator.id);
      sessionStorage.setItem('type', colaborator.collaboratorTypes)
      this.router.navigate([`colaborador/${colaborator.id}`]);
      this.method = 'edit'
      this.snackbarService.successMessage('Colaborador cadastrado com sucesso'),
        this.handleStep(2)


    } catch (error: any) {
      console.log(error);
    }
  }


  handleChanges(value: any): void {
  }


  handleStep(number: number): void {
    if (!this.checkValid() && this.step < number) {
      this.snackbarService.showAlert('Verifique os campos');
    } else if (this.step - number < 1) {
      this.step = number;
      sessionStorage.setItem('collaborator_tab', this.step.toString());
    } else {
      this.step = number;
      sessionStorage.setItem('collaborator_tab', this.step.toString());
    }
  }

  navigate(direction: string) {
    if (this.step > 1 && direction === 'back') {
      this.step -= 1;
    } else if (this.checkValid() && this.step < 8 && direction === 'next') {
      this.step += 1;
    } else {
      this.snackbarService.showAlert('Verifique os campos');
    }
  }

  checkValid(): boolean {
    let isValid = true;
    const validations = this.validations[0];
    for (let index = 0; index < validations.length; index++) {

      if (this.collaboratorForm.controls[validations[index]].invalid) {
        isValid = false;

        this.collaboratorForm.markAllAsTouched();
      }
    }
    return isValid;
  }

}


