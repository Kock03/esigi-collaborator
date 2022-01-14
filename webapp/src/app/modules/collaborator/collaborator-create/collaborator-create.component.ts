import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollaboratorProvider } from 'src/providers/collaborator.provider';

@Component({
  selector: 'app-collaborator-create',
  templateUrl: './collaborator-create.component.html',
  styleUrls: ['./collaborator-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorCreateComponent implements OnInit {
  collaboratorForm!: FormGroup;
  step: number = 1;

  constructor(
    private fb: FormBuilder,
    private collaboratorProvider: CollaboratorProvider,
    private http: HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    console.log(await this.collaboratorProvider.findAll());
    this.initForm();
  }

  initForm() {
    this.collaboratorForm = this.fb.group({
      firstNameCorporateName: ['Davi', Validators.required],
      lastNameFantasyName: ['Luiz', Validators.required],
      login: ['davi.log', Validators.required],
      gender: [1, Validators.required],
      office: ['Desenvolvedor Angular', Validators.required],
      collaboratorTypes: [1, Validators.required],
      cpf: ['25454678654', Validators.required],
      birthDate: ['06/12/2004', Validators.required],
      email: ['davi@email', Validators.required],
      cnpj: ['', Validators.required],
      stateRegistration: ['', Validators.required],
      municipalInscription: ['', Validators.required],
      site: ['site.davi', Validators.required],
      photo: null,
      Phone: this.fb.group({
        phoneNumber: ['35343234', Validators.required],
        ddd: ['71', Validators.required],
        ddi: ['+55', Validators.required],
      }),

      Address: this.fb.group({
        cep: ['', Validators.required],
        number: [''],
        complement: [''],
        street: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        district: ['', Validators.required],
      }),

      Educations: this.fb.array([]),
      Languages: this.fb.array([]),
      BankData: this.fb.array([]),
      Financials: this.fb.array([]),
      Skills: this.fb.array([]),
      Documents: null,
    });
  }

  async saveCustomer() {
    let data = this.collaboratorForm.getRawValue();

    if (!data.Educations.length) {
      data.Educations = null;
    }
    if (!data.Languages.length) {
      data.Languages = null;
    }
    if (!data.BankData.length) {
      data.BankData = null;
    }
    if (!data.Financials.length) {
      data.Financials = null;
    }
    if (!data.Skills.length) {
      data.Skills = null;
    }
    try {
      const collaborator = await this.collaboratorProvider.store(data);
    } catch (error) {
      console.log('ERROR 132' + error);
    }
  }
  handleChanges(value: any): void {
    console.log(
      '🚀 ~ file: customer-create.component.ts ~ line 36 ~ CustomerCreateComponent ~ handleChanges ~ value',
      value
    );
  }

  handleStep(number: number): void {
    this.step = number;
  }

  navigate(direction: string) {
    if (this.step > 1 && direction === 'back') {
      this.step -= 1;
    } else if (this.step < 6 && direction === 'next') {
      this.step += 1;
    }
  }
}
