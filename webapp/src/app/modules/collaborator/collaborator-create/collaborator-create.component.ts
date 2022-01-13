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
    this.collaboratorForm.valueChanges.subscribe((res) => {
      console.log(
        '🚀 ~ file: collaborator-create.component.ts ~ line 19 ~ CollaboratorCreateComponent ~ ngOnInit ~ res',
        res
      );
    });
  }

  initForm() {
    this.collaboratorForm = this.fb.group({
      collaboratorGroup: ['', Validators.required],
      firstNameCorporateName: ['Davi', Validators.required],
      lastNameFantasyName: ['Luiz', Validators.required],
      login: ['davi.log', Validators.required],
      gender: ['Masculino', Validators.required],
      office: ['Desenvolvedor Angular', Validators.required],
      collaboratorTypes: ['CLT', Validators.required],
      cpf: ['25454678654', Validators.required],
      birthDate: ['06/12/2004', Validators.required],
      email: ['DAVI@EMAIL', Validators.required],
      cnpj: ['', Validators.required],
      stateRegistration: ['', Validators.required],
      municipalInscription: ['', Validators.required],
      site: ['site.davi', Validators.required],

      Phones: {
        phoneNumber: ['35343234', Validators.required],
        ddd: ['71', Validators.required],
        doDecode: ['+55', Validators.required],
      },

      Addresses: this.fb.group({
        cep: ['89040400', Validators.required],
        number: ['44', Validators.required],
        complement: ['casa', Validators.required],
        street: ['caçadores', Validators.required],
        state: ['sc', Validators.required],
        city: ['blumenau', Validators.required],
      }),

      education: this.fb.array([]),
      language: this.fb.array([]),
      bank: this.fb.array([]),
      finance: this.fb.array([]),
      skill: this.fb.array([]),
    });
  }

  async saveCustomer() {
    const data = this.collaboratorForm.getRawValue();
    try {
      const collaborator = await this.collaboratorProvider.store(data);
      console.log(
        '🚀 ~ file: collaborator-create.component.ts ~ line 72 ~ CollaboratorCreateComponent ~ saveCustomer ~ collaborator',
        collaborator
      );
      console.log(
        '🚀 ~ file: collaborator-create.component.ts ~ line 72 ~ CollaboratorCreateComponent ~ saveCustomer ~ data',
        data
      );
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
