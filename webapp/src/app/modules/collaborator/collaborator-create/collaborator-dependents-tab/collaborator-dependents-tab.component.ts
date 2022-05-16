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

  data: [] = [];
  dependentForm!: FormGroup;
  method!: string;
  collaboratorId!: any;
  dependentId!: string;
  Dependent: any;
  collaboratorMethod!: string;
  constructor(
    public dialog: MatDialog,
    private dialogService: ConfirmDialogService, 
    private collaboratorDependentsProvider: CollaboratorDependentsProvider,
    private collaboratorProvider: CollaboratorProvider,
    private snackbarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.collaboratorMethod = sessionStorage.getItem('collaborator_method')!;
    if (this.collaboratorMethod === 'edit') {
      this.getDependentsList();
    }
  }

  async getDependentsList() {
    this.collaboratorId = sessionStorage.getItem('collaborator_id');
    const data = await this.collaboratorProvider.findOne(this.collaboratorId);
    this.data = data.Dependents;
  }



  openDialog() {
    this.method = 'add';
    sessionStorage.setItem('method', this.method);
    const dialogRef = this.dialog.open(CollaboratorDependentsDialog, {
      width: '500px',
      height: '650px',
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

  getDependents(dependentsSelected: any, id: string) {
    this.method = 'edit';
    sessionStorage.setItem('method', this.method);
    this.dependentId = id;
    sessionStorage.setItem('dependent_id', this.dependentId);
    const dialogRef = this.dialog.open(CollaboratorDependentsDialog, {
      width: '500px',
      height: '650px',
      data: dependentsSelected,
    });
    dialogRef.afterClosed().subscribe(dependent => {
      if (dependent) {
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
