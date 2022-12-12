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
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  Subject,
} from 'rxjs';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { CollaboratorCreateComponent } from '../collaborator-create/collaborator-create.component';
import { CollaboratorRegisterTabComponent } from '../collaborator-create/collaborator-register-tab/collaborator-register-tab.component';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';
import { ICollaborator } from 'src/app/interfaces/icollaborator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UserProvider } from 'src/providers/user.provider';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();

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

  collaborators!: ICollaborator[];
  filteredCollaboratorList: any;
  index: any = null;
  Collaborator: any;
  step: number = 1;
  form!: FormGroup;
  params: string = '';
  select: number = 1;
  firstNameCorporateName = '';
  token!: string;

  constructor(
    private liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private collaboratorProvider: CollaboratorProvider,
    private snackbarService: SnackBarService,
    private dialogService: ConfirmDialogService,
    private userProvider: UserProvider,
    private fb: FormBuilder
  ) {
    this._unsubscribeAll = new Subject();
  }

  async ngOnInit(): Promise<void> {
    await this.getCollaboratorList();
    this.initFilter();
  }

  async searchCollaborators() {
    const data = {
      firstNameCorporateName: this.params,
      status: this.select,
    };
    try {
      this.filteredCollaboratorList = this.collaborators =
        await this.collaboratorProvider.findByName(data);
    } catch (error) {
      console.error(error);
    }
  }

  goHome(): void {
    location.replace(`http://44.205.159.254/validate/${this.token}`);
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  createCollaborator() {
    this.router.navigate(['colaborador/novo']);
  }

  async deleteCollaborator(collaboratorId: any, user: any) {
    const options = {
      data: {
        title: 'Atenção',
        subtitle: 'Você tem certeza que deseja excluir este colaborador?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async confirmed => {
      if (confirmed) {
        try {
          const collaborators = await this.collaboratorProvider.destroy(
            collaboratorId
          );
          await this.userProvider.destroy(user);
          this.getCollaboratorList();

          this.snackbarService.successMessage(
            'Colaborador excluido com sucesso'
          );
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Excluir');
          this.getCollaboratorList();
        }
      }
    });
  }

  async selectList(ev: any) {
    this.select = ev.value;
    this.searchCollaborators();
  }

  async getCollaboratorList() {
    this.filteredCollaboratorList = this.collaborators =
      await this.collaboratorProvider.findAll();
    this.filteredCollaboratorList.sort = this.sort;
    console.log(this.filteredCollaboratorList )
  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())

      .subscribe(res => {
        this.filteredCollaboratorList = this.collaborators.filter(
          (collaborator) =>{
            collaborator.firstNameCorporateName
              .toLocaleLowerCase()
              .includes(this.filter.nativeElement.value.toLocaleLowerCase())

          }
        );
        this.params = this.filter.nativeElement.value;
        this.searchCollaborators();
        this.filteredCollaboratorList.sort = this.sort;
      });
  }

  editCollaborator(collaboratorId: any, address: any) {
    this.router.navigate([`colaborador/${collaboratorId}`]);
    const method = 'edit';
    sessionStorage.setItem('collaborator_method', method);
    sessionStorage.setItem('country_value', address.country);
    sessionStorage.setItem('flag_value', address.flag);
    sessionStorage.setItem('collaborator_id', collaboratorId);
  }


 
  
}
