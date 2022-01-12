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
  languageName: string;
  degreeOfInfluence: string;
}

@Component({
  selector: 'app-collaborator-education-tab',
  templateUrl: './collaborator-education-tab.component.html',
  styleUrls: ['./collaborator-education-tab.component.scss'],
})
export class CollaboratorEducationTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('languageTable') languageTable!: MatTable<any>;
  @ViewChild('educationTable') educationTable!: MatTable<any>;


  languages: language[] = [
    { languageName: 'Russo', degreeOfInfluence: 'Escrita' },
    { languageName: 'Inglês', degreeOfInfluence: 'Leitura' },
    { languageName: 'Alemão', degreeOfInfluence: 'Conversação' },
  ];

  educations: education[] = [
    {schooling: 'Ensino Superior', situation: 'completo', course: '', institution: ''},
  ];


  displayedEducation: string[] = [
    'schooling',
    'situation',
    'course',
    'institution',
    'icon',
  ];

  displayedLanguage: string[] = ['language', 'fluency', 'icon'];

  selectedIndex: number = 0;

  educationForm!: FormGroup;
  languageForm!: FormGroup;

  index: any = null;
  Language: any;
  Education: any;

  get languageArray() {
    return this.collaboratorForm.controls['language'] as FormArray;
  }

  get educationArray() {
    return this.collaboratorForm.controls['education'] as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.languageForm = this.fb.group({
      languageName: ['', Validators.required],
      degreeOfInfluence: ['', Validators.required],
    });
    this.educationForm = this.fb.group({
      schooling: ['', Validators.required],
      situation: ['', Validators.required],
      course: ['', Validators.required],
      institution: ['', Validators.required],
    });
  }

  next() {
    this.onChange.next(true);
  }

  saveEducation() {
    const data = this.educationForm.getRawValue();
    this.educationArray.insert(0, this.fb.group(data));
    this.educationTable.renderRows();
    this.educationForm.reset();
    
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

  cancelEdit(){
    this.index = null;
  }

  deleteLanguage(index: number){
     this.languageArray.removeAt(index);
  
  }

  
 

  getEducation(educationSelected: any, index: number) {
    this.index = index;
    this.educationForm.patchValue(educationSelected);
  }

  editEducation() {
    this.educationArray.at(this.index).setValue(this.educationForm.getRawValue());

    this.educationTable.renderRows();
    this.educationForm.reset();
    this.index = null;
  }

  deleteEducation(index: number){
    this.educationArray.removeAt(index);
 
 }
}
