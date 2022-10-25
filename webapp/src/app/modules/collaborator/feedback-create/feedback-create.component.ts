import { formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  Injectable,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
} from '@angular/material/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { ICollaborator } from 'src/app/interfaces/icollaborator';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { FeedbackProvider } from 'src/providers/feedback.provider';
import { SnackBarService } from 'src/services/snackbar.service';
import { ProjectProvider } from 'src/providers/project.provider';
import { RequireMatch } from 'src/services/autocomplete.service';
import { DateValidator } from 'src/app/validators/date.validator';

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
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class FeedbackCreateComponent implements OnInit {
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild('fiilter', { static: true }) fiilter!: ElementRef;

  feedbackForm!: FormGroup;
  Date: any;
  step: number = 1;
  collaborators!: any[];
  get!: any;
  feedbackTab: any;
  collaboratorId!: any;
  managerControl = new FormControl('', [Validators.required, RequireMatch]);
  projectControl = new FormControl('', [Validators.required, RequireMatch]);
  method: any;

  filteredCollaborators!: any[];
  filteredCollaboratorList: any;
  collaborator!: any;
  collaboratorValid: boolean = false;


  filteredProjects!: any[];
  projects!: any[];
  filteredProjectList: any;
  project!: any;
  projectValid: boolean = false;

  feedbackId!: string | null;
  feedback!: any;
  projectId: any;
  managerId: any;

  constructor(
    private fb: FormBuilder,
    private collaboratorProvider: CollaboratorProvider,
    private projectProvider: ProjectProvider,
    private router: Router,
    private feedbackProvider: FeedbackProvider,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute
  ) {
    const getId = this.router.getCurrentNavigation()?.extras.state;
    this.get = getId;
  }

  async ngOnInit(): Promise<void> {
    this.feedbackId = this.route.snapshot.paramMap.get('id');
    this.method = sessionStorage.getItem('feedback_method');
    this.getCollaboratorList();
    this.getProjectList();
    this.initFilterManager();
    this.initFilterProject();

    this.projectId = sessionStorage.getItem('project_id')
    this.managerId = sessionStorage.getItem('manager_id')


    if (this.get !== undefined) {
      this.collaboratorId = sessionStorage.getItem('collaborator_id');
      this.initForm();

    }

    if (this.feedbackId !== 'novo') {
      await this.getFeedback();
      this.initForm();

    }

    this.setFormValue();
  }

  async getCollaboratorList() {
    this.filteredCollaboratorList = this.collaborators =
      await this.collaboratorProvider.findGerente();
  }

  async getProjectList() {
    this.filteredProjectList = this.projects =
      await this.projectProvider.findAll();
  }

  private initFilterManager() {
    this.managerControl.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((res) => {
        this._filterManager(res);
        if (res && res.id) {
          this.collaboratorValid = true;
        } else {
          this.collaboratorValid = false;
        }

      });
  }

  private initFilterProject() {
    this.projectControl.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((res) => {
        this._filterProject(res);
        if (res && res.id) {
          this.projectValid = true;
        } else {
          this.projectValid = false;
        }

      });
  }

  displayFnManager(user: any): string {
    if (typeof user === 'string' && this.collaborators) {
      return this.collaborators.find(
        (collaborator) => collaborator.id === user
      );
    }
    return user && user.firstNameCorporateName && user.lastNameFantasyName
      ? user.firstNameCorporateName + ' ' + user.lastNameFantasyName
      : '';
  }

  displayFnProject(user: any): string {
    if (typeof user === 'string' && this.projects) {
      return this.projects.find(
        (project) => project.id === user
      );
    }
    return user && user.name
      ? user.name : '';
  }

  private async _filterManager(name: string): Promise<void> {
    const params = `firstNameCorporateName=${name}`;
    this.filteredCollaborators = await this.collaboratorProvider.findByNameGerente(
      params
    );
  }

  private async _filterProject(name: string): Promise<void> {
    const data = {
      name: name
    };    
    this.filteredProjects = await this.projectProvider.findByName(
      data
    );
  }

  initForm(): void {
    this.feedbackForm = this.fb.group({
      feedbackType: [null, Validators.required],
      reason: ['', Validators.required],
      projectId: ['', Validators.required],
      status: [null, Validators.required],
      managerDescription: [' ', Validators.required],
      improvementPoints: [' ', Validators.required],
      collaboratorDescription: [' ', Validators.required],
      commitment: [' ', Validators.required],
      collaboratorManagerId: ['', Validators.required],
      feedbackDate: this.fb.control({ value: ' ', disabled: false }, [DateValidator.isValidData(), Validators.required]),
      hourDate: ['', Validators.required],
      feedbackDateRetorn: this.fb.control({ value: ' ', disabled: false }, [DateValidator.isValidData(), Validators.required]),
      hourDateRetorn: [''],
      Collaborator: sessionStorage.getItem('collaborator_id'),
    });

    this.managerControl.valueChanges.subscribe((res) => {
      if (res && res.id) {
        this.feedbackForm.controls['collaboratorManagerId'].setValue(res.id, {
          emitEvent: true,
        });
      }
    });

    this.projectControl.valueChanges.subscribe((res) => {
      if (res && res.id) {
        this.feedbackForm.controls['projectId'].setValue(res.id, {
          emitEvent: true,
        });
      }
    });
  }



  onChange(value: number) {
    if (this.feedbackForm.controls['status'].value === 1 && value === 1) {
      this.removeValidators()
    }
  }


  removeValidators() {
    this.feedbackForm.controls['feedbackDateRetorn'].clearValidators()
    this.feedbackForm.controls['feedbackDateRetorn'].updateValueAndValidity()
    this.feedbackForm.controls['managerDescription'].removeValidators(Validators.required)
    this.feedbackForm.controls['improvementPoints'].removeValidators(Validators.required)
    this.feedbackForm.controls['collaboratorDescription'].removeValidators(Validators.required)
    this.feedbackForm.controls['commitment'].removeValidators(Validators.required)
  }
  listFeedback() {
    this.router.navigate([`colaborador/${this.collaboratorId}`]);
  }

  async saveFeedback() {
    let data = this.feedbackForm.getRawValue();
    try {
      const feedback = await this.feedbackProvider.store(data);
      this.router.navigate([`colaborador/${data.Collaborator}`]);
      this.snackBarService.successMessage('Feedbcack cadastrado com sucesso!');
    } catch (error) {
      console.log(error);
      this.snackBarService.showError('Falha ao cadastrar!');
    }
  }

  setFormValue() {
    if (this.feedback) {
      this.feedbackForm.patchValue(this.feedback);
      this.onChange(this.feedback.status)
      this.managerControl.patchValue(this.managerId)
      this.projectControl.patchValue(this.projectId)

    }
  }

  async getFeedback() {
    try {
      this.feedback = await this.feedbackProvider.findOne(this.feedbackId);
    } catch (error) {
      console.error(error);
    }
  }

  async saveEditFeedback() {
    let data = this.feedbackForm.getRawValue();
    try {
      const job = await this.feedbackProvider.update(this.feedback.id, data);
      this.snackBarService.successMessage('Feedbakc atualizado com sucesso');
      this.router.navigate([`colaborador/${this.collaboratorId}`]);
    } catch (error) {
      console.error(error);
    }
  }
}
