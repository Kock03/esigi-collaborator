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
import { Router } from '@angular/router';
import { ICollaborator } from 'src/app/interfaces/icollaborator';
import { CollaboratorProvider } from 'src/providers/collaborator.provider';
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
  collaboratorId!: string | null;

  constructor(
    private fb: FormBuilder,
    private collaboratorProvider: CollaboratorProvider,
    private router: Router,
    private feedbackProvider: FeedbackProvider,
    private snackBarService: SnackBarService
  ) {
    const getId = this.router.getCurrentNavigation()?.extras.state;
    this.get = getId;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.feedbackForm = this.fb.group({
      feedbackType: [null, Validators.required],
      reason: ['', Validators.required],
      project: ['', Validators.required],
      status: ['', Validators.required],
      managerDescription: ['', Validators.required],
      improvementPoints: ['', Validators.required],
      collaboratorDescription: ['', Validators.required],
      commitment: ['', Validators.required],
      manager: ['', Validators.required],
      feedbackDate: ['', Validators.required],
      hourDate: ['', Validators.required],
      feedbackDateRetorn: ['', Validators.required],
      hourDateRetorn: ['', Validators.required],
      Collaborator: { id: this.get.id },
    });
  }

  listFeedback(collaboratorId: any) {
    this.router.navigate([`colaborador/${collaboratorId}`]);
  }

  async saveFeedback(collaboratorId: any) {
    let data = this.feedbackForm.getRawValue();
    try {
      const feedback = await this.feedbackProvider.store(data);
      this.router.navigate([`colaborador/${collaboratorId}`]);
      this.snackBarService.showAlert('Feedbcack cadastrado com sucesso!');
    } catch (error) {
      console.log('ERROR 132' + error);
      this.snackBarService.showAlert('Falha ao cadastrar!');
    }
  }
  
  }

