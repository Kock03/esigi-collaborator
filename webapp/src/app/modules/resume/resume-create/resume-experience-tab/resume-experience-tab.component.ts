import { Expression } from '@angular/compiler';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IExperience } from 'src/app/interfaces/iexperience';
import { ResumeExperienceProvider } from 'src/providers/resume-providers/resume-experience.provider';
import { ResumeProvider } from 'src/providers/resume-providers/resume.provider';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';
import { ResumeDialogExperience } from './resume-experience-dialog.component';

export interface Experience {
  office: string;
  companyName: string;
  locality: string;
  active: boolean;
  startMonth: number;
  startYear: number;
  terminusMonth: number;
  terminusYear: number;
  sector: string;
  description: string;
}

@Component({
  selector: 'app-resume-experience-tab',
  templateUrl: './resume-experience-tab.component.html',
  styleUrls: ['./resume-experience-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeExperienceTabComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  data: any[] = [];
  Experience: any;
  experienceList: any[] = [];
  experienceForm!: FormGroup;
  index: any = null;
  checked = false;
  resumeId!: any;
  method!: string;
  experienceId!: string;
  resumeMethod!: string;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService,
    private dialogService: ConfirmDialogService,
    private resumeExperienceProvider: ResumeExperienceProvider,
    private resumeProvider: ResumeProvider
  ) { }

  ngOnInit(): void {
    this.resumeMethod = sessionStorage.getItem('resume_method')!;
    if (this.resumeMethod === 'edit') {
      this.getExperienceList();
    }
  }

  async getExperienceList() {
    this.resumeId = sessionStorage.getItem('resume_id');
    this.data = await this.resumeExperienceProvider.findByResume(this.resumeId);

  }

  openDialog() {
    this.method = 'add';
    sessionStorage.setItem('method', this.method);
    const dialogRef = this.dialog.open(ResumeDialogExperience, {
      width: '500px',
      height: '650px',
    });

    dialogRef.afterClosed().subscribe(async experience => {
      if (experience) {
        await this.getExperienceList()
      }
    });
  }

  getExperience(experienceSelected: any, id: string) {
    this.method = 'edit';
    sessionStorage.setItem('method', this.method);
    this.experienceId = id;
    sessionStorage.setItem('experience_id', this.experienceId);
    const dialogRef = this.dialog.open(ResumeDialogExperience, {
      width: '500px',
      height: '640px',
      data: experienceSelected,
    });
    dialogRef.afterClosed().subscribe(async experience => {
      if (experience) {
        await this.getExperienceList();
      }
    });
  }

  deleteExperience(id: string) {
    const options = {
      data: {
        title: 'Atenção',
        subtitle: 'Você tem certeza que deseja excluir essas informações?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async (confirmed) => {
      if (confirmed) {
        try {
          let deleteSkill = await this.resumeExperienceProvider.destroy(id);
          this.getExperienceList();
          this.snackbarService.successMessage('Registro Excluido Com Sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Excluir');
        }
      }
    });
  }


  next() {
    this.onChange.next(true);
  }
}
