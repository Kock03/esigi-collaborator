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
import { ActivatedRoute } from '@angular/router';
import { JobKnowledgeProvider } from 'src/providers/job-providers/job-knowledges.provider';
import { JobLanguageProvider } from 'src/providers/job-providers/job-languages.provider';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';
import { JobDialogLanguage } from './job-language-dialog.component';
import { JobDialogSkill } from './job-skill-dialog.component';

@Component({
  selector: 'app-job-skill-tab',
  templateUrl: './job-skill-tab.component.html',
  styleUrls: ['./job-skill-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobSkillTabComponent implements OnInit {
  @Input('form') jobForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('knowledgeTable') knowledgeTable!: MatTable<any>;
  @ViewChild('languageTable') languageTable!: MatTable<any>;


  index: any = null;
  Knowledge: any;
  knowledgeForm!: FormGroup;
  language: any;
  languageForm!: FormGroup;
  method: any;
  jobId: any;
  methodKnowledge: any;
  methodLanguage: any;
  data: [] = [];
  dataLanguage: [] = [];
  jobURL: any;

  displayedColumns: string[] = [
    'name',
    'yearsExperience',
    'typeOfPeriod',
    'icon',
  ];
  displayedColumnsLanguages: string[] = [
    'languageName',
    'degreeOfInfluence',
    'icon',
  ];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private snackbarService: SnackBarService,
    private route: ActivatedRoute,
    private dialogService: ConfirmDialogService,
    private jobLangagueProvider: JobLanguageProvider,
    private jobKnowledgeProvider: JobKnowledgeProvider
  ) { }

  ngOnInit(): void {
    this.method = sessionStorage.getItem('job_method');
    this.jobURL = this.route.snapshot.paramMap.get('id');

    if (this.jobURL !== 'novo') {
      this.getLanguagesList()
      this.getKnowledgeList()
    }


  }

  async getLanguagesList() {
    this.jobId = sessionStorage.getItem('job_id');
    this.dataLanguage = await this.jobLangagueProvider.findByJob(this.jobId)
  }

  async getKnowledgeList() {
    this.jobId = sessionStorage.getItem('job_id');
    this.data = await this.jobKnowledgeProvider.findByJob(this.jobId)
  }


  openDialog() {
    this.methodKnowledge = 'add';
    sessionStorage.setItem('method_knowledge', this.methodKnowledge);
    const dialogRef = this.dialog.open(JobDialogSkill, {
      width: '450px',
      height: '250px',
    });

    dialogRef.afterClosed().subscribe(knowledge => {
      if (knowledge) {
        this.getKnowledgeList()
      }
    });
  }

  openDialogLanguage() {
    this.methodLanguage = 'add';
    sessionStorage.setItem('method_language', this.methodLanguage);
    const dialogRef = this.dialog.open(JobDialogLanguage, {
      width: '450px',
      height: '250px',
    });

    dialogRef.afterClosed().subscribe(language => {
      if (language) {
        this.getLanguagesList()
      }
    });
  }


  getKnowledge(knowledgeSelected: any, id: string) {
    this.methodKnowledge = 'edit';
    sessionStorage.setItem('method_knowledge', this.methodKnowledge);
    sessionStorage.setItem('knowledge_id', id);
    const dialogRef = this.dialog.open(JobDialogSkill, {
      width: '450px',
      height: '200px',
      data: knowledgeSelected,
    });

    dialogRef.afterClosed().subscribe(knowledge => {
      if (knowledge) {
        this.getKnowledgeList()
      }
    });
  }

  getLanguage(languageSelected: any, id: string) {
    this.methodLanguage = 'edit';
    sessionStorage.setItem('method_language', this.methodLanguage);
    sessionStorage.setItem('language_id', id);
    const dialogRef = this.dialog.open(JobDialogLanguage, {
      width: '450px',
      height: '200px',
      data: languageSelected,
    });

    dialogRef.afterClosed().subscribe(language => {
      if (language) {
        this.getLanguagesList()
      }
    });
  }

  deleteKnowledge(id: string) {
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
          let deleteLanguage = await this.jobKnowledgeProvider.destroy(id);
          this.getKnowledgeList();

          this.snackbarService.successMessage('Registro Excluido Com Sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Excluir');
        }
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
          let deleteLanguage = await this.jobLangagueProvider.destroy(id);
          this.getLanguagesList();

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
      case 'degreeOfInfluence':
        return element.schooling == 1
          ? 'Leitura e Conversação'
          : element.schooling == 2
            ? 'Escrita e Conversação'
            : 'Escrita e Leitura';
      default:
        return;
    }
  }
}
