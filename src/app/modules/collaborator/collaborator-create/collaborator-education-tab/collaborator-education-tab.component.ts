import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  { schooling: 'Ensino Superior', situation: 'Concluido', course: 'Engenharia de Software', institution: 'FURB'},
  { schooling: 'Ensino Superior', situation: 'Concluido', course: 'Engenharia de Software', institution: 'FURB'},
  { schooling: 'Ensino Superior', situation: 'Concluido', course: 'Engenharia de Software', institution: 'FURB'},
  { schooling: 'Ensino Superior', situation: 'Concluido', course: 'Engenharia de Software', institution: 'FURB'},
  { schooling: 'Ensino Superior', situation: 'Concluido', course: 'Engenharia de Software', institution: 'FURB'},
  { schooling: 'Ensino Superior', situation: 'Concluido', course: 'Engenharia de Software', institution: 'FURB'},
];

const ELEMENT_LANGUAGE: language[] = [
  {language: 'Russo', fluency: 'Escrita e Leitura'}

];

@Component({
  selector: 'app-collaborator-education-tab',
  templateUrl: './collaborator-education-tab.component.html',
  styleUrls: ['./collaborator-education-tab.component.scss'],
})
export class CollaboratorEducationTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  displayedEducation: string[] = ['schooling', 'situation', 'course', 'institution'];
  dataEducation = ELEMENT_EDUCATION;

  displayedLanguage: string[] = ['language', 'fluency']
  dataLanguage = ELEMENT_LANGUAGE;

  constructor() {}

  ngOnInit(): void {}

  next() {
    this.onChange.next(true);
  }
}
