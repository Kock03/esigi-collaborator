import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { ICollaborator } from 'src/app/interfaces/icollaborator';
import { IFeedback } from 'src/app/interfaces/ifeedback';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { FeedbackProvider } from 'src/providers/feedback.provider';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { SnackBarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-collaborator-feedback-tab',
  templateUrl: './collaborator-feedback-tab.component.html',
  styleUrls: ['./collaborator-feedback-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorFeedbackTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('feedbackTable') feedbackTable!: MatTable<any>;

  displayedFeedback: string[] = [
    'feedbackDate',
    'feedbackType',
    'manager',
    'status',
    'icon',
  ];

  collaboratorId!: string | null;
  collaborator!: any;
  feedback!: IFeedback[];
  data!: Array<any>;

  get feedbackArray() {
    return this.collaboratorForm.controls['Feedbacks'] as FormArray;
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private collaboratorProvider: CollaboratorProvider,
    private snackbarService: SnackBarService,
    private dialogService: ConfirmDialogService,
    private feedbackProvider: FeedbackProvider
  ) {}

  async ngOnInit() {
    this.collaboratorId = this.route.snapshot.paramMap.get('id');
    this.getFeedback();
  }

  async getFeedback() {
    try {
      this.collaborator = await this.collaboratorProvider.findOne(
        this.collaboratorId
      );
      this.feedback = this.collaborator.Feedbacks;
    } catch (error) {
      console.error(error);
    }
  }

  navigateFeedback() {
    const navigationExtras = {
      state: {
        id: this.collaboratorId,
      },
    };
    this.router.navigate(['colaborador/feedback/novo'], navigationExtras);
  }

  async deleteFeedback(feedbackId: any) {
    const options = {
      data: {
        title: 'Atenção',
        subtitle: 'Você tem certeza que deseja excluir este Feedback?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async confirmed => {
      if (confirmed) {
        try {
          const jobs = await this.feedbackProvider.destroy(feedbackId);
          this.getFeedback();

          this.snackbarService.successMessage('Vaga Excluída Com Sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Deletar');
        }
      }
    });
  }

  editFeedback(feedbackId: any) {
    const navigationExtras = {
      state: {
        id: this.collaboratorId,
      },
    };
    this.router.navigate(
      [`colaborador/feedback/${feedbackId}`],
      navigationExtras
    );
  }
}
