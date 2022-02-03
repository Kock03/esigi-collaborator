import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  Subject,
} from 'rxjs';
import { CollaboratorProvider } from 'src/providers/collaborator.provider';
import { JobCreateComponent } from '../../job/job-create/job-create.component';

export interface Collaborator {
  collaborator: string;
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
  displayed: string[] = [
    'collaborator',
    'admissionDate',
    'office',
    'currentClient',
    'status',
    'icon',
  ];
  collaborators!: Collaborator[];
  filteredCollaboratorList!: any[];

  constructor(
    private router: Router,
    private collaboratorProvider: CollaboratorProvider
  ) {
    this._unsubscribeAll = new Subject();
  }

  async ngOnInit() {
    this.getCollaboratorList();

    this.filteredCollaboratorList = this.collaborators;
    this.initFilter();
  }

  createCollaborator() {
    this.router.navigate(['colaborador/novo']);
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
            collaborator.collaborator
              .toLocaleLowerCase()
              .includes(this.filter.nativeElement.value.toLocaleLowerCase())
        );
      });
  }
}
