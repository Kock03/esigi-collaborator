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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    {schooling: 'Ensino Fundamental', situation: 'completo', course: '', institution: ''},
    {schooling: 'Ensino Médio', situation: 'Incompleto', course: '', institution: ''},
    {schooling: 'Ensino Superior', situation: 'Em andamento', course: '', institution: ''},
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
    return this.collaboratorForm.controls['Languages'] as FormArray;
  }

  get educationArray() {
    return this.collaboratorForm.controls['Educations'] as FormArray;
  }

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initForm();
  }

  openDialogLanguage() {
    const dialogRef = this.dialog.open(CollaboratorLanguageDialog, {
      width: '500px',
      height: '620px',
    });

    dialogRef.afterClosed().subscribe((language) => {
      this.languageArray.insert(0, this.fb.group(language));
      this.languageTable.renderRows();
    });
  }

  openDialogEducation() {
    const dialogRef = this.dialog.open(CollaboratorEducationDialog, {
      width: '500px',
      height: '470px',
    });

    dialogRef.afterClosed().subscribe((education) => {
      this.educationArray.insert(0, this.fb.group(education));
      this.educationTable.renderRows();
    });
  }


  initForm(): void {
    this.languageForm = this.fb.group({
      languageName: ['', Validators.required],
      degreeOfInfluence: [1 , Validators.required],
    });
    this.educationForm = this.fb.group({
      schooling: [1 , Validators.required],
      situation: [1 , Validators.required],
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

@Component({
  selector: 'collaborator-language-dialog',
  templateUrl: 'collaborator-language-dialog.html',
})
export class CollaboratorLanguageDialog {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  languageForm!: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<CollaboratorLanguageDialog>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.languageForm = this.fb.group({
      languageName: ['', Validators.required],
      degreeOfInfluence: [1 , Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.languageForm.value);
  }
}

@Component({
  selector: 'collaborator-education-dialog',
  templateUrl: 'collaborator-education-dialog.html',
})
export class CollaboratorEducationDialog{
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  educationForm!: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<CollaboratorEducationDialog>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.educationForm = this.fb.group({
      schooling: [1 , Validators.required],
      situation: [1 , Validators.required],
      course: ['', Validators.required],
      institution: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.educationForm.value);
  }

}