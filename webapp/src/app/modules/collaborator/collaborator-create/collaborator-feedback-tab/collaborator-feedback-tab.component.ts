import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Job } from 'src/app/modules/job/job-list/job-list.component';

export interface Feedback {
  date: string;
  type: string;
  manager: string;
  status: string;
}

@Component({
  selector: 'app-collaborator-feedback-tab',
  templateUrl: './collaborator-feedback-tab.component.html',
  styleUrls: ['./collaborator-feedback-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaboratorFeedbackTabComponent implements OnInit {
  @ViewChild('feedbackTable') feedbackTable!: MatTable<any>;

  displayedFeedback: string[] = [
    'date',
    'type',
    'manager',
    'status',
  ];
  feedbacks: Feedback[] = [
    {
      date: '20/05/2005',
      type: 'Aumento de Salario',
      manager: 'Danilo',
      status: 'Concluido',
    },
  ];
  filteredFeedbackList!: any[];

  // constructor(private router: Router, private feedbackProvider: any) { }

  async ngOnInit() {
    //this.getFeedbackList();
  }

  // async getFeedbackList() {
  //   try {
  //     this.filteredFeedbackList = this.feedback = await this.feedbackProvider.findAll();
  //   } catch (error) {
  //     console.error(error);
  //   }
}
