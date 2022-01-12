import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTable } from '@angular/material/table';

export interface education {
  schooling: string;
  situation: string;
  course: string;
  institution: string;
}

export interface language {
  language: string;
  fluency: string;
}

const ELEMENT_EDUCATION: education[] = [
  {
    schooling: 'Ensino Superior',
    situation: 'Concluido',
    course: 'Engenharia de Software',
    institution: 'FURB',
  },
  {
    schooling: 'Ensino Superior',
    situation: 'Concluido',
    course: 'Engenharia de Software',
    institution: 'FURB',
  },
  {
    schooling: 'Ensino Superior',
    situation: 'Concluido',
    course: 'Engenharia de Software',
    institution: 'FURB',
  },
  {
    schooling: 'Ensino Superior',
    situation: 'Concluido',
    course: 'Engenharia de Software',
    institution: 'FURB',
  },
  {
    schooling: 'Ensino Superior',
    situation: 'Concluido',
    course: 'Engenharia de Software',
    institution: 'FURB',
  },
  {
    schooling: 'Ensino Superior',
    situation: 'Concluido',
    course: 'Engenharia de Software',
    institution: 'FURB',
  },
];

const ELEMENT_LANGUAGE: language[] = [
  { language: 'Russo', fluency: 'Escrita e Leitura' },
];

@Component({
  selector: 'app-collaborator-education-tab',
  templateUrl: './collaborator-education-tab.component.html',
  styleUrls: ['./collaborator-education-tab.component.scss'],
})
export class CollaboratorEducationTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('languageTable') languageTable!: MatTable<any>;

  displayedEducation: string[] = [
    'schooling',
    'situation',
    'course',
    'institution',
    'icon',
  ];
  dataEducation = ELEMENT_EDUCATION;

  displayedLanguage: string[] = ['language', 'fluency', 'icon'];
  dataLanguage = ELEMENT_LANGUAGE;

  selectedIndex: number = 0;

  educationForm!: FormGroup;
  languageForm!: FormGroup;

  index: any = null;

  get languageArray() {
    return this.collaboratorForm.controls['language'] as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.languageForm = this.fb.group({
      name: ['', Validators.required],
      fluency: ['', Validators.required],
    });
    // this.educationForm = this.fb.group({
    //   email: ['', Validators.required],
    //   cnpj: ['', Validators.required],
    //   stateRegistration: ['', Validators.required],
    //   municipalInscription: ['', Validators.required],
    //   site: ['', Validators.required],
    // });
  }

  next() {
    this.onChange.next(true);
  }

  saveEducation() {
    const educationArray = this.collaboratorForm.controls[
      'education'
    ] as FormArray;
    const data = this.educationForm.getRawValue();
    educationArray.push(data);
  }

  saveLanguage() {
    const data = this.languageForm.getRawValue();
    this.languageArray.insert(0, this.fb.group(data));
    this.languageTable.renderRows();
    this.languageForm.reset();
  }

  getLanguage(languageSelected: any, index: number) {
    this.index = index;
    this.languageForm.patchValue(languageSelected);
  }

  editLanguage() {
    this.languageArray.at(this.index).setValue(this.languageForm.getRawValue());

    this.languageTable.renderRows();
    this.languageForm.reset();
    this.index = null;
  }
}
