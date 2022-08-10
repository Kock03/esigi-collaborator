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
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { CollaboratorEducationProvider } from 'src/providers/collaborator-providers/collaborator-education.provider';
import { CollaboratorLanguageProvider } from 'src/providers/collaborator-providers/collaborator-language.provider';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';
import { CollaboratorEducationDialog } from './collaborator-education-dialog.component';
import { CollaboratorLanguageDialog } from './collaborator-language-dialog.component';

@Component({
  selector: 'app-collaborator-education-tab',
  templateUrl: './collaborator-education-tab.component.html',
  styleUrls: ['./collaborator-education-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorEducationTabComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('languageTable') languageTable!: MatTable<any>;
  @ViewChild('educationTable') educationTable!: MatTable<any>;

  dataLanguage: [] = [];

  dataEducation: [] = [];

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
  collaboratorMethod!: string;
  collaboratorId!: any;
  languageId!: string;
  educationId!: string;
  method!: string;



  constructor(
    private dialogService: ConfirmDialogService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private collaboratorProvider: CollaboratorProvider,
    private snackbarService: SnackBarService,
    private collaboratorLanguageProvider: CollaboratorLanguageProvider,
    private collaboratorEducationProvider: CollaboratorEducationProvider

  ) { }

  ngOnInit(): void {

    this.collaboratorMethod = sessionStorage.getItem('collaborator_method')!;
    if (this.collaboratorMethod === 'edit') {
      this.getEducationsList();
      this.getLanguagesList();
    }

  }


  async getEducationsList() {
    this.collaboratorId = sessionStorage.getItem('collaborator_id');
    this.dataEducation = await this.collaboratorEducationProvider.findByCollaborator(this.collaboratorId);
  }


  async getLanguagesList() {
    this.collaboratorId = sessionStorage.getItem('collaborator_id');
    this.dataLanguage = await this.collaboratorLanguageProvider.findByCollaborator(this.collaboratorId);
  }



  openDialogLanguage() {
    this.method = 'add';
    sessionStorage.setItem('method', this.method);
    const dialogRef = this.dialog.open(CollaboratorLanguageDialog, {
      width: '500px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe(language => {
      if (language) {
        this.getLanguagesList();
      }
    });
  }

  openDialogEducation() {
    this.method = 'add';
    sessionStorage.setItem('method', this.method);
    const dialogRef = this.dialog.open(CollaboratorEducationDialog, {
      width: '500px',
      height: '470px',
    });

    dialogRef.afterClosed().subscribe(education => {
      if (education) {
        this.getEducationsList();
      }
    });
  }

  next() {
    this.onChange.next(true);
  }

  getLanguage(languageSelected: any, id: string) {
    this.method = 'edit';
    sessionStorage.setItem('method', this.method);
    this.languageId = id;
    sessionStorage.setItem('language_id', this.languageId);
    const dialogRef = this.dialog.open(CollaboratorLanguageDialog, {
      width: '500px',
      height: '300px',
      data: languageSelected,
    });

    dialogRef.afterClosed().subscribe(language => {
      if (language) {
        this.getLanguagesList();
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
          let deleteLanguage = await this.collaboratorLanguageProvider.destroy(id);
          this.getLanguagesList();

          this.snackbarService.successMessage('Registro Excluido Com Sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Excluir');
        }
      }
    });
  }

  getEducation(educationSelected: any, id: string) {
    this.method = 'edit';
    sessionStorage.setItem('method', this.method);
    this.educationId = id;
    sessionStorage.setItem('education_id', this.educationId);
    const dialogRef = this.dialog.open(CollaboratorEducationDialog, {
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
          let deleteEducation = await this.collaboratorEducationProvider.destroy(id);
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
