import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';

import { DocumentValidator } from 'src/app/validators/document.validator';
import { CollaboratorProvider } from 'src/providers/collaborator.provider';
import { SnackBarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-collaborator-create',
  templateUrl: './collaborator-create.component.html',
  styleUrls: ['./collaborator-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorCreateComponent implements OnInit {
  collaboratorForm!: FormGroup;
  step: number = 1;
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

  url!: string;
  urlStep!: number;

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
  ) {}

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
      login: ['davi.log', Validators.required],
      gender: [1, Validators.required],
      maritalStatus: [1, Validators.required],
      office: ['Desenvolvedor Angular', Validators.required],
      collaboratorTypes: [1, Validators.required],
      active: [true, Validators.required],
      cpf: this.fb.control({ value: null, disabled: false }, [
        DocumentValidator.isValidCpf(),
        Validators.required,
      ]),
      birthDate: ['2004-06-12', Validators.required],
      admissionDate: ['', Validators.required],
      email: ['davi@email.com', [Validators.email, Validators.required]],
      cnpj: this.fb.control({ value: null, disabled: true }, [
        DocumentValidator.isValidCnpj(),
        Validators.required,
      ]),
      stateRegistration: [null, Validators.required],
      municipalInscription: [null, Validators.required],
      site: ['site.davi', Validators.required],
      linkedin: ['linkedin.davi', Validators.required],
      photo: [null],
      Phone: this.fb.group({
        phoneNumber: [
          '343234908',
          [Validators.required, Validators.maxLength(9)],
        ],
        ddd: ['71', [Validators.required, Validators.maxLength(2)]],
        ddi: ['55', Validators.required],
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
      BankData: this.fb.array(
        this.collaborator ? this.collaborator.BankData : []
      ),
      Dependents: this.fb.array(
        this.collaborator ? this.collaborator.Dependents : []
      ),
      Educations: this.fb.array(
        this.collaborator ? this.collaborator.Educations : []
      ),
      Languages: this.fb.array(
        this.collaborator ? this.collaborator.Languages : []
      ),
      Financials: this.fb.array(
        this.collaborator ? this.collaborator.Financials : []
      ),
      Skills: this.fb.array(this.collaborator ? this.collaborator.Skills : []),
      Documents: this.fb.array(
        this.collaborator ? this.collaborator.Documents : []
      ),
      Feedbacks: this.fb.array(
        this.collaborator ? this.collaborator.Feedbacks : []
      ),
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
      const colaborators = await this.collaboratorProvider.store(data);

      this.snackbarService.successMessage('Colaborador Cadastrado Com Sucesso');
      this.router.navigate(['colaborador/lista']);
    } catch (error: any) {
      console.log('ERROR 132' + error);
      this.snackbarService.showError(error.message);
    }
  }
  handleChanges(value: any): void {}

  handleStep(number: number): void {
    this.step = number;
    sessionStorage.setItem('collaborator_tab', this.step.toString());
  }

  navigate(direction: string) {
    if (this.step > 1 && direction === 'back') {
      this.step -= 1;
    } else if (this.step < 8 && direction === 'next') {
      this.step += 1;
    }
  }
}
