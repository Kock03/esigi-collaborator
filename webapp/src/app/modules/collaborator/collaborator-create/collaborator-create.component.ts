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

  Educations: any;
  Languages: any;
  BankData: any;
  Financials: any;
  Skills: any;
  Documents: any;
  Feedbacks: any;

  url!: string;
  urlStep!: number;

  constructor(
    private fb: FormBuilder,
    private collaboratorProvider: CollaboratorProvider,
    private http: HttpClient,
    private router: Router,
    private snackbarService: SnackBarService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this.collaboratorId = this.route.snapshot.paramMap.get('id');

    this.step = 1;
    this.step = JSON.parse(sessionStorage.getItem('collaborator_tab')!);

    // this.step = this.urlStep;
    // this.step = 1;

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
      console.log(
        '🚀 ~ file: collaborator-create.component.ts ~ line 82 ~ CollaboratorCreateComponent ~ getCollaborator ~ this.collaborator',
        this.collaborator
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
      this.snackbarService.successMessage(
        'Colaborador atualizado com sucesso!'
      );
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
      cnpj: this.fb.group([null, DocumentValidator.isValidCnpj(), Validators.required,
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
      BankData: this.fb.group({
        bank: [
          this.collaborator ? this.collaborator.BankData.bank : null,
          [Validators.required, Validators.maxLength(50)],
        ],
        agency: [
          this.collaborator ? this.collaborator.BankData.agency : null,
          [Validators.required, Validators.maxLength(4)],
        ],
        accountType: [
          this.collaborator ? this.collaborator.BankData.accountType : null,
          Validators.required,
        ],
        accountNumber: [
          this.collaborator ? this.collaborator.BankData.accountNumber : null,
          [Validators.required, Validators.maxLength(5)],
        ],
        digit: [
          this.collaborator ? this.collaborator.BankData.digit : null,
          [Validators.required, Validators.maxLength(1)],
        ],
        bankAccountDigit: [
          this.collaborator ? this.collaborator.BankData.bankAccountDigit : null,
          [Validators.required, Validators.maxLength(1)],
        ],
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
      Financials: this.fb.array(
        this.collaborator ? this.collaborator.Financials : [null]
      ),
      Skills: this.fb.array(
        this.collaborator ? this.collaborator.Skills : [null]
      ),
      Documents: this.fb.array(
        this.collaborator ? this.collaborator.Documents : [null]
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
      this.snackbarService.showError(error);
    }
  }
  handleChanges(value: any): void { }

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
