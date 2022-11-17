import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { CollaboratorDependentsProvider } from 'src/providers/collaborator-providers/collaborator-dependents.provider';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { ConfigProvider } from 'src/providers/config-provider';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';
import { CollaboratorDependentsDialog } from './collaborator-dependents-dialog.component';

@Component({
  selector: 'app-collaborator-dependents-tab',
  templateUrl: './collaborator-dependents-tab.component.html',
  styleUrls: ['./collaborator-dependents-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorDependentsTabComponent implements OnInit {
  @Input() dependentsArray!: FormArray;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('dependentTable') dependentTable!: MatTable<any>;

  displayedDependents: string[] = [
    'type',
    'firstName',
    'gender',
    'cpf',
    'birthDate',
    'phoneNumber',
    'email',
    'icon',
  ];

  gender: any[] = []
  ddi: any[] = []
  type: any[] = []

  data: any[] = [];
  dependentForm!: FormGroup;
  method!: string;
  collaboratorId!: any;
  dependentId!: string;
  Dependent: any;
  collaboratorMethod!: string;
  constructor(
    public dialog: MatDialog,
    private dialogService: ConfirmDialogService,
    private configProvider: ConfigProvider,

    private collaboratorDependentsProvider: CollaboratorDependentsProvider,
    private collaboratorProvider: CollaboratorProvider,
    private snackbarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.getKeysCollaborator();
    this.getKeysGeneric();
    this.collaboratorMethod = sessionStorage.getItem('collaborator_method')!;
    if (this.collaboratorMethod === 'edit') {
      this.getKeysCollaborator();
      this.getKeysGeneric();
      this.getDependentsList();
    }
  }

  async getKeysGeneric() {
    let data = {
      key: ["ddi"]
    }
    const arrays = await this.configProvider.findKeys('generic', data)

    const keyList = arrays.reduce(function (array: any, register: any) {
      array[register.key] = array[register.key] || [];
      array[register.key].push({ id: register.id, value: register.value });
      return array;
    }, Object.create(null));
    this.ddi = keyList['ddi'];

  }

  async getKeysCollaborator() {
    let data = {
      key: ["gender", "depentents"]
    }
    const arrays = await this.configProvider.findKeys('collaborator', data)

    const keyList = arrays.reduce(function (array: any, register: any) {
      array[register.key] = array[register.key] || [];
      array[register.key].push({ id: register.id, value: register.value });
      return array;
    }, Object.create(null));
    this.gender = keyList['gender'];
    this.type = keyList['depentents']
  }


  async getDependentsList() {
    this.collaboratorId = sessionStorage.getItem('collaborator_id');
    this.data = await this.collaboratorDependentsProvider.findByCollaborator(this.collaboratorId);
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.gender.length; j++) {
        if (this.data[i].gender === this.gender[j].id) {
          this.data[i].gender = this.gender[j].value
        }
      }
      for (let j = 0; j < this.type.length; j++) {
        if (this.data[i].type === this.type[j].id) {
          this.data[i].type = this.type[j].value
        }
      }
      for (let j = 0; j < this.ddi.length; j++) {
        if (this.data[i].ddi === this.ddi[j].id) {
          this.data[i].ddi = this.ddi[j].value
        }
      }
    }
  }



  openDialog() {
    this.method = 'add';
    sessionStorage.setItem('method', this.method);
    const dialogRef = this.dialog.open(CollaboratorDependentsDialog, {
      width: '500px',
      height: '570px',
    });

    dialogRef.afterClosed().subscribe(dependent => {
      if (dependent) {
        this.getDependentsList();
      }
    });
  }

  next() {
    this.onChange.next(true);
  }



  async getDependents(dependentsSelected: any, id: string) {
    this.method = 'edit';
    sessionStorage.setItem('method', this.method);
    this.dependentId = id;
    const dependent = await this.collaboratorDependentsProvider.findOne(id);

    sessionStorage.setItem('dependent_id', this.dependentId);
    const dialogRef = this.dialog.open(CollaboratorDependentsDialog, {
      width: '500px',
      height: '650px',
      data: dependent,
    });
    dialogRef.afterClosed().subscribe(dependent => {
      if (dependent) {
        this.getKeysCollaborator();
        this.getKeysGeneric();
        this.getDependentsList();
      }
    });
  }

  deleteDependents(id: string) {
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
          let deleteDependent = await this.collaboratorDependentsProvider.destroy(id);
          this.getDependentsList();

          this.snackbarService.successMessage('Registro Excluido Com Sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Excluir');
        }
      }
    });
  }
}
