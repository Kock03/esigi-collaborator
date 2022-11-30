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
import { ConfigProvider } from 'src/providers/config-provider';

@Component({
  selector: 'app-collaborator-skill-tab',
  templateUrl: './collaborator-skill-tab.component.html',
  styleUrls: ['./collaborator-skill-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorSkillTabComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('skillTable') skillTable!: MatTable<any>;

  displayedColumns: string[] = ['technology', 'time', 'typeOfPeriod', 'level', 'icon'];
  seniority: any[] = [];
  technologies: any[] = [];

  data: any[] = [];

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
    private configProvider: ConfigProvider,

    private snackbarService: SnackBarService,
    private collaboratorProvider: CollaboratorProvider,
  ) { }

  ngOnInit(): void {
    this.getKeysCollaborator()

    this.collaboratorMethod = sessionStorage.getItem('collaborator_method')!;
    if (this.collaboratorMethod === 'edit') {
      this.getKeysCollaborator()

      this.getSkillList();
    }

  }
  async getKeysCollaborator() {
    let data = {
      key: ["seniority", "technologies"]
    }
    const arrays = await this.configProvider.findKeys('collaborator', data)

    const keyList = arrays.reduce(function (array: any, register: any) {
      array[register.key] = array[register.key] || [];
      array[register.key].push({ id: register.id, value: register.value });
      return array;
    }, Object.create(null));
    this.seniority = keyList['seniority']
    this.technologies = keyList['technologies']

  }

  async getSkillList() {
    this.collaboratorId = sessionStorage.getItem('collaborator_id');
    this.data = await this.collaboratorSkillProvider.findByCollaborator(this.collaboratorId);
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.seniority.length; j++) {
        if (this.data[i].seniority === this.seniority[j].id) {
          this.data[i].seniority = this.seniority[j].value
        }
      }
      for (let j = 0; j < this.technologies.length; j++) {
        if (this.data[i].technology === this.technologies[j].id) {
          this.data[i].technology = this.technologies[j].value
        }
      }
    }
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

  async getSkill(skillSelected: any, id: string) {
    this.method = 'edit';
    sessionStorage.setItem('method', this.method);
    this.skillId = id;
    const skill = await this.collaboratorSkillProvider.findOne(id)
    sessionStorage.setItem('skill_id', this.skillId);
    const dialogRef = this.dialog.open(CollaboratorSkillDialog, {
      width: '500px',
      height: '540px',
      data: skill,
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
          this.snackbarService.successMessage('Registro excluido com sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao excluir');
        }
      }
    });
  }
}
