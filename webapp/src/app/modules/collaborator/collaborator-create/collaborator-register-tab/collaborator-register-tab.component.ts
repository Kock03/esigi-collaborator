import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { ApiGateway } from 'src/api-gateway';
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
  selector: 'app-collaborator-register-tab',
  templateUrl: './collaborator-register-tab.component.html',
  styleUrls: ['./collaborator-register-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class CollaboratorRegisterTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  selectedFile: any;
  date: any;
  url: any;
  collaboratorId!: string | null;
  collaborator!: any;

  typeControl = new FormControl();

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.collaboratorId = this.route.snapshot.paramMap.get('id');
    this.url =
      'https://st.depositphotos.com/1734074/4228/v/450/depositphotos_42286141-stock-illustration-vector-man-with-mustache-in.jpg';
    if (this.collaboratorId == 'novo') {
      this.collaboratorForm.valueChanges.subscribe(res => {
        const addressForm = this.collaboratorForm.controls[
          'Address'
        ] as FormGroup;

        addressForm.controls['cep'].valueChanges.subscribe(res => {});
      });
    }
  }

  ngAfterViewInit(): void {}

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
    const address = this.collaboratorForm.controls['Address'].value;
    const district = await this.cepService.findDistrict(
      address.cep.replace('-', '')
    );

    if (district.erro) {
      window.alert('Cep inválido');
      this.collaboratorForm.controls['Address'].reset();
    } else {
      this.collaboratorForm.controls['Address'].patchValue({
        cep: district.cep,
        city: district.localidade,
        street: district.logradouro,
        state: district.uf,
        district: district.bairro,
      });
    }
  }

  fileChanged(file: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = _file => {
      this.url = reader.result;
      this.collaboratorForm.patchValue({
        photo: reader.result,
      });
    };
  }
  collaboratorIsActive() {
    if (this.collaborator.active == true) {
      this.collaborator.active = 'ativo';
    } else {
      this.collaborator.active = 'inativo';
    }
  }
}
