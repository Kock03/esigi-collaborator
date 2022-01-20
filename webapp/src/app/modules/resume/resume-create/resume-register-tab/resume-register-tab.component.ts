import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup,FormBuilder,  Validators,  } from '@angular/forms';
import { DocumentValidator } from 'src/app/validators/document.validator';

@Component({
  selector: 'app-resume-register-tab',
  templateUrl: './resume-register-tab.component.html',
  styleUrls: ['./resume-register-tab.component.scss']
})
export class ResumeRegisterTabComponent implements OnInit {
  @Input('form') resumeForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  Gender: any = [
    'Masculimo',
    'Feminino',
    'Não informado',
  ];

  MaritalStatus: any = [
    'Solteiro(a)',
    'Casado',
    'Viúvo',
    'União Estável',
  ];
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.resumeForm.valueChanges.subscribe((res) => {
      const addressForm = this.resumeForm.controls[
        'Address'
      ] as FormGroup;
      console.log(
        '🚀 ~ file: collaborator-register-tab.component.ts ~ line 56 ~ CollaboratorRegisterTabComponent ~ ngAfterViewInit ~ addressForm',
        addressForm
      );
      addressForm.controls['cep'].valueChanges.subscribe((res) => {
        console.log(
          "🚀 ~ file: collaborator-register-tab.component.ts ~ line 57 ~ CollaboratorRegisterTabComponent ~ addressForm.controls['cep'].valueChanges.subscribe ~ res",
          res
        );
      });
    });
  }

  

  next() {
    this.onChange.next(true);
  
  }

  compareSelect(o1: any, o2: any): boolean {
    if (!o1 || !o2) {
      return false;
    }
    return o1.id === o2.id;
  }
}
