import { formatDate } from '@angular/common';
import {
  Component,
  Injectable,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
} from '@angular/material/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { ICollaborator } from 'src/app/interfaces/icollaborator';
import { DocumentValidator } from 'src/app/validators/document.validator';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { FeedbackProvider } from 'src/providers/feedback.provider';
import { SnackBarService } from 'src/services/snackbar.service';

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
  feedbackForm!: FormGroup;
  Date: any;
  step: number = 1;
  collaborators!: ICollaborator[];
  get!: any;
  feedbackTab: any;
  collaboratorId!: any;

  feedbackId!: string | null;
  feedback!: any;

  constructor(
    private fb: FormBuilder,
    private collaboratorProvider: CollaboratorProvider,
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

  initForm(): void {
    this.feedbackForm = this.fb.group({
      feedbackType: [null, Validators.required],
      reason: ['', Validators.required],
      project: ['', Validators.required],
      status: [null, Validators.required],
      managerDescription: [' ', Validators.required],
      improvementPoints: [' ', Validators.required],
      collaboratorDescription: [' ', Validators.required],
      commitment: [' ', Validators.required],
      manager: ['', Validators.required],
      feedbackDate: this.fb.control({ value: ' ', disabled: false }, [DocumentValidator.isValidData(), Validators.required]),
      hourDate: ['', Validators.required],
      feedbackDateRetorn: this.fb.control({ value: ' ', disabled: false }, [DocumentValidator.isValidData(), Validators.required]),
      hourDateRetorn: [''],
      Collaborator: sessionStorage.getItem('collaborator_id'),
    });
  }

  onChange(value: number) {
    if (this.feedbackForm.controls['status'].value === 1) {
      this.removeValidators()
      console.log(this.feedbackForm)
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
