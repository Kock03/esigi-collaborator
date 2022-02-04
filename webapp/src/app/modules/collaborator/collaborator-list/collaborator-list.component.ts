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
import { Router } from '@angular/router';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  Subject,
} from 'rxjs';
import { CollaboratorProvider } from 'src/providers/collaborator.provider';

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
  @Input('form') collaboratorFrom!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
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

  collaboratorForm!: FormGroup;

  index: any = null;

  get collaboratorArray() {
    return this.collaboratorForm.controls['Collaborator'] as FormArray;
  }

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

  deleteCollaborator(index: number) {
    this.collaboratorArray.removeAt(index);
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
