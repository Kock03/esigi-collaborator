import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resume-create',
  templateUrl: './resume-create.component.html',
  styleUrls: ['./resume-create.component.scss'],
})
export class ResumeCreateComponent implements OnInit {
  resumeForm!: FormGroup;
  step: number = 1;


  

  constructor(
    private fb: FormBuilder,
    // private resumeProvider: ResumeProvider,
    ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
      this.resumeForm = this.fb.group({
        name: ['Davi', Validators.required],
        lastName: ['Luiz', Validators.required],
        login: ['davi.log', Validators.required],
        cpf: ['Luiz', Validators.required],
        birthDate: ['06/12/2004', Validators.required],
        gender: [1, Validators.required],
        maritalStatus: [1, Validators.required],
  
        Address: this.fb.group({
          zipCode: ['', Validators.required],
          number: [''],
          complement: [''],
          street: ['', Validators.required],
          state: ['', Validators.required],
          city: ['', Validators.required],
          district: ['', Validators.required],
        }),
  
          phoneNumber: ['35343234908', Validators.required],
          ddd: ['71', Validators.required],
          ddi: ['', Validators.required],
      
        email: ['davi@email', Validators.email],
        site: ['site.davi', Validators.required],
        linkedin: ['linkedin.davi', Validators.required],


        Languages: this.fb.array([]),
        Educations: this.fb.array([]),
        Experiences: this.fb.array([]),
        Skills: this.fb.array([]),
        Monitoring: this.fb.array([]),
        Register: this.fb.array([]),
        Documents: null,
      });
    }

    async saveResume() {
      let data = this.resumeForm.getRawValue();
  
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
      // try {
      //   const collaborator = await this.collaboratorProvider.store(data);
      // } catch (error) {
      //   console.log('ERROR 132' + error);
      // }
    }


  navigate(direction: string) {
    if (this.step > 1 && direction === 'back') {
      this.step -= 1;
    } else if (this.step < 6 && direction === 'next') {
      this.step += 1;
    }
  }

  handleChanges(value: any): void {
    console.log(
      '🚀 ~ file: customer-create.component.ts ~ line 36 ~ CustomerCreateComponent ~ handleChanges ~ value',
      value
    );
  }
}
