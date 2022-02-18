import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

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

  Educations: any;
  Languages: any;
  BankData: any;
  Financials: any;
  Skills: any;
  Documents: any;

  constructor(
    private fb: FormBuilder,
    private collaboratorProvider: CollaboratorProvider,
    private http: HttpClient,
    private router: Router,
    private snackbarService: SnackBarService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.collaboratorId = this.route.snapshot.paramMap.get('id');
    this.initForm();
    this.step = 1;
    if (this.collaboratorId !== 'novo') {
      await this.getCollaborator();
      this.setFormValue();
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
  }

  async saveEditCollaborator() {
    let data = this.collaboratorForm.getRawValue();
    try {
      const job = await this.collaboratorProvider.update(
        this.collaboratorId,
        data
      );
      this.router.navigate(['colaborador/lista']);
    } catch (error) {
      console.error(error);
    }
  }

  initForm() {
    this.collaboratorForm = this.fb.group({
      firstNameCorporateName: ['Davi', Validators.required],
      lastNameFantasyName: ['Luiz', Validators.required],
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

      email: ['davi@email', [Validators.email, Validators.required]],
      cnpj: ['', Validators.required],
      stateRegistration: ['', Validators.required],
      municipalInscription: ['', Validators.required],
      site: ['site.davi', Validators.required],
      linkedin: ['linkedin.davi', Validators.required],
      photo: [''],
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
      BankData: this.fb.group({
        bank: [this.collaborator? this.collaborator.BankData.bank: '-', [Validators.required, Validators.maxLength(50)]],
        agency: ['1111', [Validators.required, Validators.maxLength(4)]],
        accountType: [1, Validators.required],
        accountNumber: ['11111', [Validators.required, Validators.maxLength(5)]],
        digit: ['1', [Validators.required, Validators.maxLength(1)]],
        bankAccountDigit: ['1', [Validators.required, Validators.maxLength(1)]],
      }),

      Dependents: this.fb.array(
        this.collaborator ? this.collaborator.Dependents : [null]
      ),
      Educations: this.fb.array(
        this.collaborator ? this.collaborator.Educations : [null]
      ),
      Languages: this.fb.array(
        this.collaborator ? this.collaborator.Languages : [null]
      ),
      // BankData: this.fb.group(
      //   this.collaborator ? this.collaborator.BankData : [null]
      // ),
      Financials: this.fb.array(
        this.collaborator ? this.collaborator.Financials : [null]
      ),
      Skills: this.fb.array(
        this.collaborator ? this.collaborator.Skills : [null]
      ),
      Documents: this.fb.array(
        this.collaborator ? this.collaborator.Documents : [null]
      ),
    });
  }

  setFormValue() {
    this.collaboratorForm.patchValue(this.collaborator);
  }

  async saveCollaborator() {
    let data = this.collaboratorForm.getRawValue();

    try {
      data.Dependents = new Array(data.Dependents);
      data.Educations = new Array(data.Educations);
      data.Languages = new Array(data.Languages);
      // data.BankData = new Array(data.BankData);
      data.Financials = new Array(data.Financials);
      data.Skills = new Array(data.Skills);

      const colaborators = await this.collaboratorProvider.store(data);

      this.snackbarService.successMessage('Vaga Cadastrada Com Sucesso');
      this.router.navigate(['collaborador/lista']);
    } catch (error) {
      console.log('ERROR 132' + error);
      this.snackbarService.showError('Falha ao Cadastrar');
    }
  }
  handleChanges(value: any): void {}

  handleStep(number: number): void {
    this.step = number;
  }

  navigate(direction: string) {
    if (this.step > 1 && direction === 'back') {
      this.step -= 1;
    } else if (this.step < 9 && direction === 'next') {
      this.step += 1;
    }
  }
}
