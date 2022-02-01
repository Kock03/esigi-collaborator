import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { CepService } from 'src/services/cep.service';

@Component({
  selector: 'app-resume-register-tab',
  templateUrl: './resume-register-tab.component.html',
  styleUrls: ['./resume-register-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeRegisterTabComponent implements OnInit {
  @Input('form') resumeForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  Gender: any = ['Masculimo', 'Feminino', 'Não informado'];

  MaritalStatus: any = ['Solteiro(a)', 'Casado', 'Viúvo', 'União Estável'];

  constructor(private fb: FormBuilder, private cepService: CepService) {}

  ngOnInit(): void {
    this.resumeForm.valueChanges.subscribe((res) => {
      const addressForm = this.resumeForm.controls['Address'] as FormGroup;
      addressForm.controls['cep'].valueChanges.subscribe((res) => {});
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
  async getAddress() {
    const address = this.resumeForm.controls['Address'].value;

    console.log(address.cep);

    const district = await this.cepService.findDistrict(
      address.cep.replace('-', '')
    );

    if (district.erro) {
      window.alert('Cep inválido');

      this.resumeForm.controls['Address'].reset();
    } else {
      this.resumeForm.controls['Address'].patchValue({
        cep: district.cep,

        city: district.localidade,

        street: district.logradouro,

        district: district.bairro,

        state: district.uf,

      });
    }
  }
}
