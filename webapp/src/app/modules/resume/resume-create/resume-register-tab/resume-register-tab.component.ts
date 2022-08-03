import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { CepService } from 'src/services/cep.service';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'numeric', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'numeric', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'numeric' },
  },
};

@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MM-yyyy', this.locale);
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
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class ResumeRegisterTabComponent implements OnInit {
  @Input('form') resumeForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  Gender: any = ['Masculimo', 'Feminino', 'Não informado'];
  Date: any;
  MaritalStatus: any = ['Solteiro(a)', 'Casado', 'Viúvo', 'União Estável'];
  resumeId!: string | null;
  view!: boolean;

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resumeId = this.route.snapshot.paramMap.get('id');
    if (this.resumeId == 'novo') {
      this.view = true;
      this.resumeForm.valueChanges.subscribe(res => {
        const addressForm = this.resumeForm.controls['Address'] as FormGroup;
        addressForm.controls['cep'].valueChanges.subscribe(res => {});
      });
    }else{
      this.view = false;
    }
  }

  
  setValueLogin() {

      if (this.resumeForm.controls['firstName'].value != null && this.resumeForm.controls['lastName'].value != null) {

        this.resumeForm.controls['login'].setValue(`${this.resumeForm.controls['firstName'].value}.${this.resumeForm.controls['lastName'].value}@Envolti.com.br`);

      }
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

    const district = await this.cepService.findDistrict(
      address.cep.replace('-', '')
    );

    if (district.erro) {
      window.alert('Cep inválido');
      this.view = true;


      this.resumeForm.controls['Address'].reset();
    } else {
      this.view = false;

      this.resumeForm.controls['Address'].patchValue({
        cep: district.cep,

        city: district.localidade,

        street: district.logradouro,

        district: district.bairro,

        state: district.uf,
      });
    }
  }
  fileChanged(file: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.resumeForm.patchValue({
        photo: reader.result,
      });
    };
    reader.readAsText(file.target.files[0]);
  }
}
