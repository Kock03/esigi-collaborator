import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentValidator } from 'src/app/validators/document.validator';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ResumeDialogExperience } from './resume-experience-tab/resume-experience-tab.component';
import { ResumeProvider } from 'src/providers/resume.provider';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/services/snackbar.service';


@Component({
  selector: 'app-resume-create',
  templateUrl: './resume-create.component.html',
  styleUrls: ['./resume-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeCreateComponent implements OnInit {
  resumeForm!: FormGroup;
  step: number = 1;
  resume!: any;
  resumeId!: string | null;

  Experience: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private resumeProvider: ResumeProvider,
    private snackbarService: SnackBarService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  // ngOnInit(): void {
  //   this.initForm();
  //   this.step = 1;

  //   this.resumeForm.controls['Experiences'].valueChanges.subscribe(res => {
  //     console.log("🚀 ~ file: resume-create.component.ts ~ line 46 ~ ResumeCreateComponent ~ ngOnInit ~ res", res)
  //   })
  // }

  async ngOnInit(): Promise<void> {
    this.resumeId = this.route.snapshot.paramMap.get('id');
    this.initForm();
    this.step = 1;
    if (this.resumeId !== 'novo') {
      this.setFormValue();
    }
  }

  initForm() {
    this.resumeForm = this.fb.group({
      firstName: ['joao', Validators.required],
      lastName: ['silva', Validators.required],
      login: ['joao.silva', Validators.required],

      cpf: this.fb.control(
        { value: null, disabled: false },
        DocumentValidator.isValidCpf()
      ),

      birthDate: ['2022-01-01', Validators.required],
      gender: [1, Validators.required],
      maritalStatus: [1, Validators.required],
      photo: ['', Validators.required],

      Address: this.fb.group({
        cep: ['89040400', Validators.required],
        number: ['43'],
        complement: ['casa'],
        street: ['rua', Validators.required],
        state: ['estado', Validators.required],
        city: ['cidade', Validators.required],
        district: ['bairro', Validators.required],
      }),
      Phone: this.fb.group({
        phoneNumber: ['42334324', Validators.required],
        ddd: ['44', Validators.required],
        ddi: ['44', Validators.required],
      }),

      email: ['joao@silva.com', Validators.email],
      site: ['', Validators.required],
      linkedin: ['', Validators.required],



   
      Educations: this.fb.array(
        this.resume ? this.resume.Educations : [null]
      ),
      Languages: this.fb.array(
        this.resume ? this.resume.Languages : [null]
      ),
      Experiences: this.fb.array(
        this.resume ? this.resume.Experiences : [null]
      ),
      Skills: this.fb.array(
        this.resume ? this.resume.Skills : [null]
      ),
    });

  }

   setFormValue() {
    this.resumeForm.patchValue(this.resume);
  }

  async saveResume() {
    let data = this.resumeForm.getRawValue();

    try {
      data.Educations = new Array(data.Educations);
      data.Languages = new Array(data.Languages);
      data.Experiences = new Array(data.Experiences);
      data.Skills = new Array(data.Skills);
      const resume = await this.resumeProvider.store(data);

      this.snackbarService.successMessage('Vaga Cadastrada Com Sucesso');
      this.router.navigate(['curriculo/lista']);
    } catch (error) {
      console.log('ERROR 132' + error);
      this.snackbarService.showError('Falha ao Cadastrar');
    }
  }

  

  navigate(direction: string) {
    if (this.step > 1 && direction === 'back') {
      this.step -= 1;
    } else if (this.step < 5 && direction === 'next') {
      this.step += 1;
    }
  }

  listResume() {
    this.router.navigate(['curriculo/lista']);
  }

  handleChanges(value: any): void {}
}
