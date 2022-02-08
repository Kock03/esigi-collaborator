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

@Component({
  selector: 'app-resume-create',
  templateUrl: './resume-create.component.html',
  styleUrls: ['./resume-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeCreateComponent implements OnInit {
  resumeForm!: FormGroup;
  step: number = 1;

  Experience: any;


  

  constructor(
    private fb: FormBuilder,
    
    private resumeProvider: ResumeProvider,
    ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
      this.resumeForm = this.fb.group({
        firstName: ['joao', Validators.required],
        lastName: ['silva', Validators.required],
        login: ['joao.silva', Validators.required],
        cpf: this.fb.control({ value: null, disabled: false}, DocumentValidator.isValidCpf()),
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

      


        Languages: this.fb.array([]),
        Educations: this.fb.array([]),
        Experiences: this.fb.array([]),
        Skills: this.fb.array([]),
      });

      this.resumeForm.valueChanges.subscribe(res => {
        console.log("🚀 ~ file: resume-create.component.ts ~ line 90 ~ ResumeCreateComponent ~ initForm ~ res", res)
      })
    }


    
  
    async saveResume() {
      let data = this.resumeForm.getRawValue();
  
      try {
        const resume = await this.resumeProvider.store(data);
      } catch (error) {
        console.log('ERROR 132' + error);
      }
    }


  navigate(direction: string) {
    if (this.step > 1 && direction === 'back') {
      this.step -= 1;
    } else if (this.step < 4 && direction === 'next') {
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


