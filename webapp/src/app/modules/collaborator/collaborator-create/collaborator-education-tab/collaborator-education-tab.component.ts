import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

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

  constructor() {}

  ngOnInit(): void {}

  next() {
    this.onChange.next(true);
  }

  save() {
    const educationArray = this.collaboratorForm.controls[
      'education'
    ] as FormArray;
    // const data = this.educationForm.getRawValue();
    //  educationArray.push(data)
  }
}
