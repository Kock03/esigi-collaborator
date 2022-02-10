import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { CollaboratorProvider } from 'src/providers/collaborator.provider';

@Component({
  selector: 'app-collaborator-create',
  templateUrl: './collaborator-create.component.html',
  styleUrls: ['./collaborator-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorCreateComponent implements OnInit {
  // @ViewChild('educationTable') educationTable!: MatTable<any>;
  // @ViewChild('languageTable') languageTable!: MatTable<any>;
  // @ViewChild('bankTable') bankTable!: MatTable<any>;
  // @ViewChild('financeTable') financeTable!: MatTable<any>;
  // @ViewChild('skillsTable') skillsTable!: MatTable<any>;
  // @ViewChild('documentsTable') documentsTable!: MatTable<any>;

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
      office: ['Desenvolvedor Angular', Validators.required],
      collaboratorTypes: [1, Validators.required],
      cpf: this.fb.control({ value: null, disabled: false }, [
        DocumentValidator.isValidCpf(),
        Validators.required,
      ]),
      birthDate: ['06/12/2004', Validators.required],
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
      Educations: this.fb.array(
        new Array(
          this.fb.group({
            schooling: null,
            course: null,
            institution: null,
            situation: null,
          })
        )
      ),
      Languages: this.fb.array(
        new Array(
          this.fb.group({
            languageName: null,
            degreeOfInfluence: null,
          })
        )
      ),
      BankData: this.fb.array(
        new Array(
          this.fb.group({
            bank: null,
            agency: null,
            accountTypet: null,
            accountNumber: null,
            digit: null,
            bankAccountDigit: null,
          })
        )
      ),
      Financials: this.fb.array(
        new Array(
          this.fb.group({
            contractType: null,
            value: null,
            reason: null,
            dateInclusion: null,
          })
        )
      ),
      Skills: this.fb.array(
        new Array(
          this.fb.group({
            tecnology: null,
            seniority: null,
            yearsExperience: null,
            currentPosition: null,
          })
        )
      ),
      Documents: this.fb.array(
        new Array(
          this.fb.group({
            name: null,
            file: null,
          })
        )
      ),
    });
  }

  setFormValue() {
    this.collaboratorForm.patchValue(this.collaborator);
    // if (this.collaborator.Address[0]) {
    //   const address = this.collaboratorForm.controls['Address'] as FormGroup;
    //   address.patchValue(this.collaborator.Address[0]);
    // }
    // if (this.collaborator.Phone[0]) {
    //   const phone = this.collaboratorForm.controls['Phone'] as FormGroup;
    //   phone.value.patchValue(this.collaborator.Phone[0]);
    // }
    // if (this.collaborator.Educations[0] == null) {
    //   console.log(this.collaborator.Educations);

    //   const educations = this.collaboratorForm.controls[
    //     'Educations'
    //   ] as FormArray;
    //   educations.value.splice(0, 1);
    // }
    // if (this.collaborator.Language == null) {
    //   const languages = this.collaboratorForm.controls[
    //     'Languages'
    //   ] as FormArray;
    //   languages.value.splice(0, 1);
    // }

    // if (this.collaborator.BankData == null) {
    //   const bankData = this.collaboratorForm.controls['BankData'] as FormArray;

    //   bankData.value.splice(0, 1);
    // }
  }

  async saveCollaborator() {
    let data = this.collaboratorForm.getRawValue();
    console.log(data);
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
