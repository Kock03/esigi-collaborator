import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';

import { DocumentValidator } from 'src/app/validators/document.validator';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { SnackBarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-collaborator-create',
  templateUrl: './collaborator-create.component.html',
  styleUrls: ['./collaborator-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorCreateComponent implements OnInit {
  collaboratorForm!: FormGroup;
  step: any = 1;
  collaboratorId!: string | null;
  collaborator!: any;
  active: boolean = true;

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

  validations = [
    ['cpf', 'admissionDate'],
    ['Dependents'],
    ['Educations', 'Languages'],
    ['BankData'],
    ['Financials'],
    ['Skills'],
    ['Documents'],
  ];

  get educationArray() {
    return this.collaboratorForm.controls['Educations'] as FormArray;
  }
  get languageArray() {
    return this.collaboratorForm.controls['Languages'] as FormArray;
  }

  get dependentsArray() {
    return this.collaboratorForm.controls['Dependents'] as FormArray;
  }
  get bankArray() {
    return this.collaboratorForm.controls['BankData'] as FormArray;
  }

  get financeArray() {
    return this.collaboratorForm.controls['Financials'] as FormArray;
  }

  get skillArray() {
    return this.collaboratorForm.controls['Skills'] as FormArray;
  }
  get documentArray() {
    return this.collaboratorForm.controls['Documents'] as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private collaboratorProvider: CollaboratorProvider,
    private router: Router,
    private snackbarService: SnackBarService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    if (sessionStorage.getItem('collaborator_tab') == undefined) {
      sessionStorage.setItem('collaborator_tab', '1');
    }

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

  initForm() {
    this.collaboratorForm = this.fb.group({
      firstNameCorporateName: [null, Validators.required],
      lastNameFantasyName: [null, Validators.required],
      login: [null, Validators.required],
      gender: [null, Validators.required],
      maritalStatus: [null, Validators.required],
      office: [null, Validators.required],
      collaboratorTypes: [null, Validators.required],
      active: [null, Validators.required],
      cpf: this.fb.control({ value: null, disabled: false }, [
        DocumentValidator.isValidCpf(),
      ]),
      birthDate: [null, Validators.required],
      admissionDate: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      cnpj: this.fb.control({ value: null, disabled: true }, [
        DocumentValidator.isValidCnpj(),
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
        cep: ['', Validators.required],
        number: [''],
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
    }
  }

  async saveCollaborator() {
    let data = this.collaboratorForm.getRawValue();

    try {
      const colaborator = await this.collaboratorProvider.store(data);
      sessionStorage.setItem('colaborator_id', colaborator.id);
      this.snackbarService.successMessage('Colaborador Cadastrado Com Sucesso');
      this.router.navigate(['colaborador/lista']);
      sessionStorage.clear();
    } catch (error: any) {
      console.log('ERROR 132' + error);
    }
  }
  handleChanges(value: any): void { }

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
    const validations = this.validations[this.step - 1];
    for (let index = 0; index < validations.length; index++) {
      if (this.collaboratorForm.controls[validations[index]].invalid) {
        isValid = false;
  
        this.collaboratorForm.markAllAsTouched();
      }
    }
    return isValid;
  }
}
