import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

export interface Application {
  jobName: string;
  client: string;
  applicationDate: string;
  returnDate: string;
  status: string;
  responsible: string;
}

@Component({
  selector: 'app-resume-application-tab',
  templateUrl: './resume-application-tab.component.html',
  styleUrls: ['./resume-application-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeApplicationTabComponent implements OnInit {
  @Input('form') resumeForm!: FormGroup;
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter();
  private _unsubscribeAll: Subject<any>;

  dataSource: Application[] = [
    {
      jobName: 'C#',
      client: 'Ambev',
      applicationDate: '03/01/2020',
      returnDate: '22/02/2020',
      status: 'Reprovado',
      responsible: 'Wellington Almeida',
    },
  ];
  displayedApplication: string[] = [
    'jobName',
    'client',
    'applicationDate',
    'returnDate',
    'status',
    'responsible',
  ];
  applications!: Application[];
  filteredApplicationList!: any[];

  constructor(private router: Router /*, private jobProvider: JobProvider*/) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {}
}
