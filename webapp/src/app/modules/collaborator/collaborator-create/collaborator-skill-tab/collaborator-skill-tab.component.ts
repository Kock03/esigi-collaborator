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
import { MatTable } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CollaboratorSkillDialog } from './collaborator-skill-dialog.component';
import { CollaboratorSkillProvider } from 'src/providers/collaborator-providers/collaborator-skill.provider';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';

@Component({
  selector: 'app-collaborator-skill-tab',
  templateUrl: './collaborator-skill-tab.component.html',
  styleUrls: ['./collaborator-skill-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorSkillTabComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('skillTable') skillTable!: MatTable<any>;

  displayedColumns: string[] = ['technology', 'time','typeOfPeriod', 'level', 'icon'];

  data: [] = [];

  selectedIndex: number = 0;
  skillForm!: FormGroup;
  Skill: any;
  checked = false;
  method!: string;
  collaboratorId!: any;
  skillId!: string;
  collaboratorMethod!: string;

  constructor(
    private fb: FormBuilder, 
    public dialog: MatDialog,
    private collaboratorSkillProvider: CollaboratorSkillProvider, 
    private dialogService: ConfirmDialogService, 
    private snackbarService: SnackBarService,   
    private collaboratorProvider: CollaboratorProvider,
   ) {}

  ngOnInit(): void {
    this.collaboratorMethod = sessionStorage.getItem('collaborator_method')!;
    if (this.collaboratorMethod === 'edit') {
      this.getSkillList();
    }

  }

  async getSkillList() {
    this.collaboratorId = sessionStorage.getItem('collaborator_id');
    const data = await this.collaboratorProvider.findOne(this.collaboratorId);
    this.data = data.Skills;
  }



  openDialog() {
    this.method = 'add';
    sessionStorage.setItem('method', this.method);
    const dialogRef = this.dialog.open(CollaboratorSkillDialog, {
      width: '500px',
      height: '540px',
    });

    dialogRef.afterClosed().subscribe(skill => {
      if (skill) {
        this.getSkillList()
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
    const dialogRef = this.dialog.open(CollaboratorSkillDialog, {
      width: '500px',
      height: '540px',
      data: skillSelected,
    });
    dialogRef.afterClosed().subscribe(skill => {
      if (skill) {
        this.getSkillList();
      }
    });
  }

  deleteSkill(id: string) {
    const options = {
      data: {
        title: 'Atenção',
        subtitle: 'Você tem certeza que deseja excluir esta Skill?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async (confirmed) => {
      if (confirmed) {
        try {
          let deleteSkill = await this.collaboratorSkillProvider.destroy(id);
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
