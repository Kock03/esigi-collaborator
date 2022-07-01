import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';

export interface ICollaborator {

  id: string;
  firstNameCorporateName: string;
  lastNameCorporateName: string

}

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'numeric', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'numeric', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'numeric' },
  },
};

@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MM-yyyy', this.locale);
    } else {
      return date.toDateString();
    }
  }
}

@Component({
  selector: 'app-job-register-tab',
  templateUrl: './job-register-tab.component.html',
  styleUrls: ['./job-register-tab.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class JobRegisterTabComponent implements OnInit {
  @Input('form') jobForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  date: any;

  collaboratorControl = new FormControl();
  collaborator!: ICollaborator;
  collaborators!: ICollaborator[] | any[];
  collaboratorValid: boolean = false;
  filteredCollaboratorList: any;
  collaboratorId!: string | null;
  filteredCollaborators?: any[];

  constructor(

    private collaboratorProvider: CollaboratorProvider,
  ) {}

  ngOnInit(): void {}

  async getCollaboratorList() {
    this.filteredCollaboratorList = this.collaborators =
      await this.collaboratorProvider.shortListCollaborators();
  }

  displayFn(user: any): string {
    if (typeof user === 'string' && this.collaborators) {
      return this.collaborators.find(
        (collaborator) => collaborator.id === user
      );
    }
    return user && user.firstNameCorporateName && user.lastNameFantasyName
      ? user.firstNameCorporateName + ' ' + user.lastNameFantasyName
      : '';
  }
}
