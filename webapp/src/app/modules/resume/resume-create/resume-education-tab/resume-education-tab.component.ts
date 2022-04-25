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
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { ResumeEducationDialog } from './resume-education-dialog.component';
import { ResumeLanguageDialog } from './resume-language-dialog.component';

@Component({
  selector: 'app-resume-education-tab',
  templateUrl: './resume-education-tab.component.html',
  styleUrls: ['./resume-education-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeEducationTabComponent implements OnInit {
  @Input() educationArray!: FormArray;
  @Input() languageArray!: FormArray;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('languageTable') languageTable!: MatTable<any>;
  @ViewChild('educationTable') educationTable!: MatTable<any>;

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

  constructor(
    private dialogService: ConfirmDialogService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.educationArray.value.length > 0) {
      this.dataEducation = this.educationArray.value;
    }
    if (this.languageArray.value.length > 0) {
      this.dataLanguage = this.languageArray.value;
    }
    this.initObservables();
  }

  initObservables() {
    this.educationArray.valueChanges.subscribe(res => {
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

    this.languageArray.valueChanges.subscribe(res => {
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

    dialogRef.afterClosed().subscribe(language => {
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

    dialogRef.afterClosed().subscribe(education => {
      if (education) {
        this.educationArray.insert(0, this.fb.group(education));
        this.educationTable.renderRows();
      }
    });
  }

  next() {
    this.onChange.next(true);
  }

  getLanguage(languageSelected: any, index: number) {
    const dialogRef = this.dialog.open(ResumeLanguageDialog, {
      width: '500px',
      height: '300px',
      data: languageSelected,
    });

    this.index = index;
    dialogRef.afterClosed().subscribe(language => {
      if (language) {
        this.languageArray.controls[this.index].patchValue(language);
      }
    });
  }

  deleteLanguage(index: number) {
    const options = {
      data: {
        title: 'Atenção',
        subtitle: 'Você tem certeza que deseja excluir essas informações?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async confirmed => {
      if (confirmed) {
        this.languageArray.removeAt(index);
      }
    });
  }

  getEducation(educationSelected: any, index: number) {
    const dialogRef = this.dialog.open(ResumeEducationDialog, {
      width: '500px',
      height: '470px',
      data: educationSelected,
    });

    this.index = index;
    dialogRef.afterClosed().subscribe(education => {
      if (education) {
        this.educationArray.controls[this.index].patchValue(education);
      }
    });
  }

  deleteEducation(index: number) {
    const options = {
      data: {
        title: 'Atenção',
        subtitle: 'Você tem certeza que deseja excluir essas informações?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async confirmed => {
      if (confirmed) {
        this.educationArray.removeAt(index);
      }
    });
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
