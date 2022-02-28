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
import { CollaboratorProvider } from 'src/providers/collaborator.provider';

@Component({
  selector: 'app-collaborator-feedback-tab',
  templateUrl: './collaborator-feedback-tab.component.html',
  styleUrls: ['./collaborator-feedback-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorFeedbackTabComponent implements OnInit {
  @Input('form') collaboratorForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('feedbackTable') feedbackTable!: MatTable<any>;

  displayedFeedback: string[] = [
    'feedbackDate',
    'feedbackType',
    'manager',
    'status',
    'icon',
  ];

  filteredFeedbackList!: any[];
  collaboratorId!: string | null;
  collaborator!: ICollaborator
  data!: Array<any>;
  feedback!: any[]

  get feedbackArray() {
    return this.collaboratorForm.controls['Feedbacks'] as FormArray;
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private collaboratorProvider: CollaboratorProvider,
  ) {}

  async ngOnInit() {
    this.collaboratorId = this.route.snapshot.paramMap.get('id');
    this.getJob()
    this.feedback = this.collaborator?.Feedbacks
  }

  async getJob() {
    try {
      this.collaborator = await this.collaboratorProvider.findOne(this.collaboratorId);
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
}
