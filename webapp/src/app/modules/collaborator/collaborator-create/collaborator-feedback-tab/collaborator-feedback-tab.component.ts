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
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IFeedback } from 'src/app/interfaces/ifeedback';
import { Job } from 'src/app/modules/job/job-list/job-list.component';

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
  data: [] = [];

  get feedbackArray() {
    return this.collaboratorForm.controls['Feedbacks'] as FormArray;
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }


  async ngOnInit() {
    this.collaboratorId = this.route.snapshot.paramMap.get('id');

    // this.data = this.feedbackArray.value();

    this.initObservables();
  }

  initObservables() {
    this.feedbackArray.valueChanges.subscribe((res) => {

      this.data = this.feedbackArray.value;
      this.feedbackTable.renderRows();
      console.log(
        '🚀 ~ file: collaborator-feedback-tab.component.ts ~ line 64 ~ CollaboratorFeedbackTabComponent ~ this.feedbackArray.valueChanges.subscribe ~   this.data ',
        this.data
      );

    });
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
