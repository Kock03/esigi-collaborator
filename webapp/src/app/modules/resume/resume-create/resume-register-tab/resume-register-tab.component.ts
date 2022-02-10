import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Injectable, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { CepService } from 'src/services/cep.service';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'numeric', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'numeric', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'numeric' }
  }
};

@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MM-yyyy', this.locale);;
    } else {
      return date.toDateString();
    }
  }
}
@Component({
  selector: 'app-resume-register-tab',
  templateUrl: './resume-register-tab.component.html',
  styleUrls: ['./resume-register-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
  ]
})
export class ResumeRegisterTabComponent implements OnInit {
  @Input('form') resumeForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  Gender: any = ['Masculimo', 'Feminino', 'Não informado'];
  Date: any;
  MaritalStatus: any = ['Solteiro(a)', 'Casado', 'Viúvo', 'União Estável'];

  constructor(private fb: FormBuilder, private cepService: CepService) { }

  ngOnInit(): void {
    this.resumeForm.valueChanges.subscribe((res) => {
      const addressForm = this.resumeForm.controls['Address'] as FormGroup;
      addressForm.controls['cep'].valueChanges.subscribe((res) => { });
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
