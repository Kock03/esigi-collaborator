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
import { ResumeEducationProvider } from 'src/providers/resume-providers/resume-education.provider';
import { ResumeLanguageProvider } from 'src/providers/resume-providers/resume-language.provider';
import { ResumeProvider } from 'src/providers/resume-providers/resume.provider';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';
import { ResumeEducationDialog } from './resume-education-dialog.component';
import { ResumeLanguageDialog } from './resume-language-dialog.component';

@Component({
  selector: 'app-resume-education-tab',
  templateUrl: './resume-education-tab.component.html',
  styleUrls: ['./resume-education-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeEducationTabComponent implements OnInit { 
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
  Education: any;
  resumeMethod!: string;
  resumeId!: any | null;
  languageId!: string;
  educationId!: string;
  method!: string;

  constructor(
    private dialogService: ConfirmDialogService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private resumeProvider: ResumeProvider,
    private snackbarService: SnackBarService,
    private resumeLanguageProvider: ResumeLanguageProvider,
    private resumeEducationProvider: ResumeEducationProvider
  ) {}

  ngOnInit(): void {
    this.resumeMethod = sessionStorage.getItem('resume_method')!;
    if (this.resumeMethod === 'edit') {
      this.getEducationsList();
      this.getLanguagesList();
    }

  }

  async getEducationsList() {
    this.resumeId = sessionStorage.getItem('resume_id');

    const data = await this.resumeProvider.findOne(this.resumeId);
    this.dataEducation = data.Educations;
  }

  
  async getLanguagesList() {
    this.resumeId = sessionStorage.getItem('resume_id');
    const data = await this.resumeProvider.findOne(this.resumeId);
    this.dataLanguage = data.Languages;
  }

  next() {
    this.onChange.next(true);
  }

  openDialogLanguage() {
    this.method = 'add';
    sessionStorage.setItem('method', this.method);
    const dialogRef = this.dialog.open(ResumeLanguageDialog, {
      width: '500px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe(async language => {
      if (language) {
        await this.getLanguagesList();
      }
    });
  }
  
  getLanguage(languageSelected: any, id: string) {
    this.method = 'edit';
    sessionStorage.setItem('method', this.method);
    this.languageId = id;
    sessionStorage.setItem('language_id', this.languageId);
    const dialogRef = this.dialog.open(ResumeLanguageDialog, {
      width: '500px',
      height: '300px',
      data: languageSelected,
    });

    dialogRef.afterClosed().subscribe(async language => {
      if (language) {
        await this.getLanguagesList();
      }
    });
  }

  deleteLanguage(id: string) {
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
        try {
          let deleteLanguage = await this.resumeLanguageProvider.destroy(id);
          this.getLanguagesList();

          this.snackbarService.successMessage('Registro Excluido Com Sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Excluir');
        }
      }
    });
  }

  openDialogEducation() {
    this.method = 'add';
    sessionStorage.setItem('method', this.method);
    const dialogRef = this.dialog.open(ResumeEducationDialog, {
      width: '500px',
      height: '470px',
    });

    dialogRef.afterClosed().subscribe(async education => {
      if (education) {
       await this.getEducationsList();
      }
    });
  }

  getEducation(educationSelected: any, id: string) {
    this.method = 'edit';
    sessionStorage.setItem('method', this.method);
    this.educationId = id;
    sessionStorage.setItem('education_id', this.educationId);
    const dialogRef = this.dialog.open(ResumeEducationDialog, {
      width: '500px',
      height: '470px',
      data: educationSelected,
    });
    dialogRef.afterClosed().subscribe(async education => {
      if (education) {
        await this.getEducationsList();
      }
    });
  }

  deleteEducation(id: string) {
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
        try {
          let deleteEducation = await this.resumeEducationProvider.destroy(id);
          this.getEducationsList();

          this.snackbarService.successMessage('Registro Excluido Com Sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Excluir');
        }
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
