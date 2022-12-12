import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, fromEvent, debounceTime, distinctUntilChanged } from 'rxjs';
import { IInterview } from 'src/app/interfaces/iinterview';
import { IJob } from 'src/app/interfaces/ijob';
import { SnackBarService } from 'src/services/snackbar.service';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { Job } from '../../job-list/job-list.component';
import { JobPanelModel } from 'src/models/job-panel-model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { InterviewsProvider } from 'src/providers/interview.provider';
import { FormGroup } from '@angular/forms';
import { JobProvider } from 'src/providers/job-providers/job.provider';
import { ResumeProvider } from 'src/providers/resume-providers/resume.provider';

import { TechnicalInterviewProvider } from 'src/providers/technicalInterview.provider';
import { ClientInterviewProvider } from 'src/providers/clientInterview.provider';
import { CustomerProvider } from 'src/providers/customer.provider';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { ContactProvider } from 'src/providers/contact.provier';


@Component({
  selector: 'app-job-panel-tab',
  templateUrl: './job-panel-tab.component.html',
  styleUrls: ['./job-panel-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobPanelTabComponent implements OnInit {
  @ViewChild('interviewsTable') interviewsTable!: MatTable<any>;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @Input('form') behavioralInterviewForm!: FormGroup;
  @Input('form') technicalInterviewForm!: FormGroup;

  private _unsubscribeAll: Subject<any>;
  displayedJob: string[] = [
    'nameCandidate',
    'behavioralInterviewDate',
    'technicalInterviewDate',
    'responsible',
    'status',
    'icon',
  ];
  interviews: IInterview[] = [];
  filteredInterviewList = new MatTableDataSource();
  jobs!: Job[];
  job: any;
  jobId!: string | null;
  data: any;
  Id!: string | null;

  constructor(
    private snackbarService: SnackBarService,
    private router: Router,
    private contactProvider: ContactProvider,

    private route: ActivatedRoute,
    private JobProvider: JobProvider,
    private dialogService: ConfirmDialogService,
    private InterviewsProvider: InterviewsProvider,
    private clientInterviewProvider: ClientInterviewProvider,
    private customerProvider: CustomerProvider,
    private collaboratorProvider: CollaboratorProvider,
  ) {
    this._unsubscribeAll = new Subject();
  }

  async ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id');
    this.getInterviewList();
    this.initFilter();
  }

  async getInterviewList() {
    try {
      const interviews = await this.JobProvider.getFollowUpInterviews(
        this.jobId
      );
      interviews.map((interview: any) => {
        this.interviews.push(new JobPanelModel(interview));
      });

      this.interviewsTable.renderRows();

    } catch (error) {
      console.error(error);
    }
  }



  async editInterview(interviewId: any, nameCandidate?: any, resumeId?: any) {
    const interviewData = await this.InterviewsProvider.findOne(interviewId);
    if (interviewData.ClientInterviews) {
      const clientData = await this.contactProvider.findOne(interviewData.ClientInterviews.evaluator);
      sessionStorage.setItem('customer_id', clientData.name);
    }
    if (interviewData.BehavioralInterviews) {
      const collaboratorData = await this.collaboratorProvider.findOne(interviewData.BehavioralInterviews.techRecruter);
      sessionStorage.setItem('collaborator_tech_id', `${collaboratorData.firstNameCorporateName} ${collaboratorData.lastNameFantasyName}`);
    }
    if (interviewData.TechnicalInterviews) {
      const collaboratorData = await this.collaboratorProvider.findOne(interviewData.TechnicalInterviews.collaboratorRequesterId);
      sessionStorage.setItem('collaborator_id', `${collaboratorData.firstNameCorporateName} ${collaboratorData.lastNameFantasyName}`);

    }
    sessionStorage.setItem('resume_name', `${nameCandidate.firstName} ${nameCandidate.lastName}`);
    sessionStorage.setItem('resume_id', resumeId);

    sessionStorage.setItem('method', 'edit');

    const navigationExtras = {
      state: {
        id: this.jobId,
      },
    };



    this.router.navigate([`vaga/interview/${interviewId}`], navigationExtras);
  }

  async deleteInterview(interviewId: any) {
    const options = {
      data: {
        title: 'Atenção',
        subtitle: 'Você tem certeza que deseja excluir esta entrevista?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async (confirmed) => {
      if (confirmed) {
        try {
          const interviews = await this.InterviewsProvider.destroy(interviewId);

          this.interviews = [];
          this.getInterviewList()
          this.snackbarService.successMessage(
            'Entrevista excluida com sucesso'
          );
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Excluir');
        }
      }
    });
  }

  deleteRow(id: any) {
    const index = this.data.indexOf(id);
    this.data.splice(index, 1);
  }

  navigateJobs() {
    const navigationExtras = {
      state: {
        id: this.jobId,
      },
    };
    this.router.navigate(['vaga/interview/novo'], navigationExtras);
    sessionStorage.setItem('job_tab', '1');
  }

  createJob() {
    const navigationExtras = {
      state: {
        id: this.jobId,
      },
    };
    sessionStorage.setItem('method', 'add');
    this.router.navigate(['vaga/novo']);
  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())

      .subscribe(res => {
        this.filteredInterviewList.data = this.interviews.filter(interview =>
          interview.nameCandidate
            .toLocaleLowerCase()
            .includes(this.filter.nativeElement.value.toLocaleLowerCase())
        );

      });
  }
}
