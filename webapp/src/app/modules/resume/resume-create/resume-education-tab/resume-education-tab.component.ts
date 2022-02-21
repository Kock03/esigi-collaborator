import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-resume-education-tab',
  templateUrl: './resume-education-tab.component.html',
  styleUrls: ['./resume-education-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeEducationTabComponent implements OnInit {
  @Input('form') resumeForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('languageTable') languageTable!: MatTable<any>;
  @ViewChild('educationTable') educationTable!: MatTable<any>;

  displayedColumns: string[] = ['schooling', 'situation', 'course', 'icon'];

  dataLanguage: [] = [];

  dataEducation: [] = [];

  displayedLanguage: string[] = ['language', 'fluency', 'icon'];

  displayedEducation: string[] = [
    'schooling',
    'situation',
    'course',
    'institution',
    'icon',
  ];

  selectedIndex: number = 0;

  educationForm!: FormGroup;
  languageForm!: FormGroup;

  index: any = null;
  Language: any;
  languageList: any = [];
  Education: any;
  educationList: any = [];

  get languageArray() {
    return this.resumeForm.controls['Languages'] as FormArray;
  }

  get educationArray() {
    return this.resumeForm.controls['Educations'] as FormArray;
  }

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (
      this.educationArray.value &&
      this.educationArray.value.findIndex(
        (education: any) => education == null
      ) === -1
    ) {
      this.dataEducation = this.educationArray.value;
    } else {
      this.educationArray.value.splice(0, 1)
    }

    if (
      this.languageArray.value &&
      this.languageArray.value.findIndex(
        (language: any) => language == null
      ) === -1
    ) {
      this.dataLanguage = this.languageArray.value;
    }

    this.initObservables();
  }

  initObservables() {
    this.educationArray.valueChanges.subscribe((res) => {
      const isNullIndex = this.educationArray.value.findIndex(
        (education: any) => education == null
      );
      if (isNullIndex !== -1) {
        this.educationArray.removeAt(isNullIndex);
      }
      if (res) {
        this.dataEducation = this.educationArray.value;
      }
    });

    this.languageArray.valueChanges.subscribe((res) => {
      const isNullIndex = this.languageArray.value.findIndex(
        (language: any) => language == null
      );
      if (isNullIndex !== -1) {
        this.languageArray.removeAt(isNullIndex);
      }
      if (res) {
        this.dataLanguage = this.languageArray.value;
      }
    });
  }

  openDialogLanguage() {
    const dialogRef = this.dialog.open(ResumeLanguageDialog, {
      width: '500px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((language) => {
      if (language) {
        this.languageArray.insert(0, this.fb.group(language));
        this.languageTable.renderRows();
      }
    });
  }

  openDialogEducation() {
    const dialogRef = this.dialog.open(ResumeEducationDialog, {
      width: '500px',
      height: '470px',
    });

    dialogRef.afterClosed().subscribe((education) => {
      if (education) {
        this.educationArray.insert(0, this.fb.group(education));
        this.educationTable.renderRows();
      }
    });
  }

  initForm(): void {
    this.languageForm = this.fb.group({
      languageName: ['', Validators.required],
      degreeOfInfluence: [1, Validators.required],
    });
    this.educationForm = this.fb.group({
      schooling: [1, Validators.required],
      situation: [1, Validators.required],
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
    const dialogRef = this.dialog.open(ResumeLanguageDialog, {
      width: '500px',
      height: '300px',
      data: { languageSelected },
    });

    this.index = index;
    dialogRef.afterClosed().subscribe((language) => {
      this.languageArray.controls[this.index].setValue(language);
    });
  }

  deleteLanguage(index: number) {
    this.languageArray.removeAt(index);
  }

  getEducation(educationSelected: any, index: number) {
    const dialogRef = this.dialog.open(ResumeEducationDialog, {
      width: '500px',
      height: '470px',
      data: { educationSelected },
    });

    this.index = index;
    dialogRef.afterClosed().subscribe((education) => {
      this.educationArray.controls[this.index].setValue(education);
    });
  }

  deleteEducation(index: number) {
    this.educationArray.removeAt(index);
  }

  getLabel(label: string, element: any) {
    if (!element) {
      return;
    }
    switch (label) {
      case 'schooling':
        return element.schooling == 1
          ? 'Ensino Fundamental'
          : element.schooling == 2
          ? 'Ensino Médio'
          : 'Ensino Superior';
      case 'situation': {
        return element.situation == 1
          ? 'Parado'
          : element.situation == 2
          ? 'Completo'
          : 'Em andamento';
      }
      default:
        return;
    }
  }
}

@Component({
  selector: 'resume-language-dialog',
  templateUrl: 'resume-language-dialog.html',
  styleUrls: ['./resume-education-tab.component.scss'],
})
export class ResumeLanguageDialog {
  @Input('form') resumeForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  languageForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ResumeLanguageDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { languageSelected: any }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.languageForm = this.fb.group({
      languageName: ['Inglês', [Validators.required, Validators.maxLength(40)]],
      degreeOfInfluence: [1, Validators.required],
    });
    if (this.data && this.data.languageSelected) {
      this.languageForm.patchValue(this.data.languageSelected);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.languageForm.getRawValue());
  }
}

@Component({
  selector: 'resume-education-dialog',
  templateUrl: 'resume-education-dialog.html',
  styleUrls: ['./resume-education-tab.component.scss'],
})
export class ResumeEducationDialog {
  @Input('form') resumeForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();

  educationForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ResumeEducationDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { educationSelected: any }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.educationForm = this.fb.group({
      schooling: [1, Validators.required],
      situation: [1, Validators.required],
      course: [
        'Engenharia de Software',
        [Validators.required, Validators.maxLength(100)],
      ],
      institution: ['FURB', [Validators.required, Validators.maxLength(100)]],
    });
    if (this.data && this.data.educationSelected) {
      this.educationForm.patchValue(this.data.educationSelected);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.educationForm.getRawValue());
  }
}
