import { coerceStringArray } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
  EventEmitter,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  Subject,
} from 'rxjs';
import { CollaboratorProvider } from 'src/providers/collaborator.provider';
import { CollaboratorCreateComponent } from '../collaborator-create/collaborator-create.component';
import { CollaboratorRegisterTabComponent } from '../collaborator-create/collaborator-register-tab/collaborator-register-tab.component';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';

export interface Collaborator {
  id: string;
  firstNameCorporateName: string;
  admissionDate: Date;
  office: number;
  currentClient: string;
  stauts: number;
}

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorListComponent implements OnInit {
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  private _unsubscribeAll: Subject<any>;

  displayedCollaborator: string[] = [
    'collaborator',
    'admissionDate',
    'office',
    'currentClient',
    'status',
    'icon',
  ];

  collaborators!: Collaborator[];
  filteredCollaboratorList!: any[];
  index: any = null;
  Collaborator: any;

  // get collaboratorArray() {
  //   return this.collaboratorForm.controls['Collaborators'] as FormArray;
  // }

  constructor(
    private router: Router,
    private collaboratorProvider: CollaboratorProvider,
    private snackbarService: SnackBarService,
    private dialogService: ConfirmDialogService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  async ngOnInit() {
    this.getCollaboratorList();
    this.initFilter();
  }

  createCollaborator() {
    this.router.navigate(['colaborador/novo']);
  }

  // getCollaborator(collaboratorSelected: any, index: number) {
  //   const dialogRef = this.dialog.open(CollaboratorCreateComponent, {
  //     data: { collaboratorSelected },
  //   });

  //   this.index = index;
  //   dialogRef.afterClosed().subscribe((collaborator) => {
  //     this.collaboratorArray.controls[this.index].setValue(collaborator);
  //   });
  // }

  // async deleteCollaborator(index: number) {
  //   const collaborator = this.filteredCollaboratorList[index];
  //   try {
  //     await this.collaboratorProvider.destroy(collaborator.id);
  //     this.getCollaboratorList();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async deleteCollaborator(collaboratorId: any) {
    const options = {
      data: {
        title: 'Anteção',
        subtitle: 'Você tem certeza que deseja excluir esta vaga?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async (confirmed) => {
      if (confirmed) {
        try {
          const collaborators = await this.collaboratorProvider.destroy(collaboratorId);
          this.getCollaboratorList();

          this.snackbarService.successMessage('Vaga Excluída Com Sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Deletar');
        }
      }
    });
  }

  async getCollaboratorList() {
    try {
      this.filteredCollaboratorList = this.collaborators =
        await this.collaboratorProvider.findAll();
    } catch (error) {
      console.error(error);
    }
  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())

      .subscribe((res) => {
        this.filteredCollaboratorList = this.collaborators.filter(
          (collaborator) =>
            collaborator.firstNameCorporateName
              .toLocaleLowerCase()
              .includes(this.filter.nativeElement.value.toLocaleLowerCase())
        );
      });
  }

  editCollaborator(collaboratorId: any) {
    this.router.navigate([`colaborador/${collaboratorId}`]);
  }
}
