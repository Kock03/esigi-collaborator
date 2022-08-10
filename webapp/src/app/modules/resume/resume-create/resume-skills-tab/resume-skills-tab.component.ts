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
import { ResumeSkillsProvider } from 'src/providers/resume-providers/resume-skills.provider';
import { ResumeProvider } from 'src/providers/resume-providers/resume.provider';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';
import { ResumeSkillDialog } from './resume-skill.dialog.component';

@Component({
  selector: 'app-resume-skills-tab',
  templateUrl: './resume-skills-tab.component.html',
  styleUrls: ['./resume-skills-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeSkillsTabComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('skillTable') skillTable!: MatTable<any>;

  displayedColumns: string[] = ['name', 'time', 'typeOfPeriod', 'level', 'icon'];

  data: [] = [];

  selectedIndex: number = 0;
  skillForm!: FormGroup;
  Skill: any;
  checked = false;
  method!: string;
  resumeId!: any;
  skillId!: string;
  resumeMethod!: string;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private snackbarService: SnackBarService,
    private dialogService: ConfirmDialogService,
    private resumeSkillsProvider: ResumeSkillsProvider,
    private resumeProvider: ResumeProvider
  ) { }

  ngOnInit(): void {
    this.resumeMethod = sessionStorage.getItem('resume_method')!;
    if (this.resumeMethod === 'edit') {
      this.getSkillList();
    }
  }

  async getSkillList() {
    this.resumeId = sessionStorage.getItem('resume_id');
    this.data = await this.resumeSkillsProvider.findByResume(this.resumeId);
  }

  openDialog() {
    this.method = 'add';
    sessionStorage.setItem('method', this.method);
    const dialogRef = this.dialog.open(ResumeSkillDialog, {
      width: '500px',
      height: '540px',
    });

    dialogRef.afterClosed().subscribe(async skill => {
      if (skill) {
        await this.getSkillList()
      }
    });
  }

  next() {
    this.onChange.next(true);
  }

  getSkill(skillSelected: any, id: string) {
    this.method = 'edit';
    sessionStorage.setItem('method', this.method);
    this.skillId = id;
    sessionStorage.setItem('skill_id', this.skillId);
    const dialogRef = this.dialog.open(ResumeSkillDialog, {
      width: '500px',
      height: '540px',
      data: skillSelected,
    });
    dialogRef.afterClosed().subscribe(async skill => {
      if (skill) {
        await this.getSkillList();
      }
    });
  }

  deleteSkill(id: string) {
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
          let deleteSkill = await this.resumeSkillsProvider.destroy(id);
          this.getSkillList();
          this.snackbarService.successMessage('Registro Excluido Com Sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Excluir');
        }
      }
    });
  }
}
