import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-collaborator-create',
  templateUrl: './collaborator-create.component.html',
  styleUrls: ['./collaborator-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorCreateComponent implements OnInit {
  collaboratorForm!: FormGroup;
  step: number = 5;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.collaboratorForm.valueChanges.subscribe(res => {
    console.log("🚀 ~ file: collaborator-create.component.ts ~ line 19 ~ CollaboratorCreateComponent ~ ngOnInit ~ res", res)
      
    })
  }

  initForm() {
    this.collaboratorForm = this.fb.group({
      collaboratorGroup: ['', Validators.required],
      firstNameCorporateName: ['', Validators.required],
      lastNameFantasyName: ['', Validators.required],
      login: ['', Validators.required],
      gender: ['', Validators.required],
      office: ['', Validators.required],
      collaboratorTypes: ['', Validators.required],
      cpf: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', Validators.required],
      cnpj: ['', Validators.required],
      stateRegistration: ['', Validators.required],
      municipalInscription: ['', Validators.required],
      site: ['', Validators.required],
      
      //phone entity
     
      phoneNumber: ['', Validators.required],
     
      //adresses entity 

      cep: ['', Validators.required],
      number: ['', Validators.required],
      complement: ['', Validators.required],
      street: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],




      education: this.fb.array([]),
      language: this.fb.array([]),
      bank: this.fb.array([]),
      finance: this.fb.array([]),
      skill: this.fb.array([]),
    });
  }

  saveCustomer() {
    if (this.collaboratorForm.valid) {
      const data = this.collaboratorForm.getRawValue();
      
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
