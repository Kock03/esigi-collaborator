import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, fromEvent, debounceTime, distinctUntilChanged } from 'rxjs';
import { IInterview } from 'src/app/interfaces/iinterview';
import { IJob } from 'src/app/interfaces/ijob';
import { SnackBarService } from 'src/services/snackbar.service';
import { JobProvider } from 'src/providers/job.provider';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { Job } from '../../job-list/job-list.component';
import { JobPanelModel } from 'src/models/job-panel-model';
import { MatTable } from '@angular/material/table';
import { InterviewsProvider } from 'src/providers/interview.provider';

// import { IInterview } from 'src/app/interfaces/iinterview';

@Component({
  selector: 'app-job-panel-tab',
  templateUrl: './job-panel-tab.component.html',
  styleUrls: ['./job-panel-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobPanelTabComponent implements OnInit {
  @ViewChild('interviewsTable') interviewsTable!: MatTable<any>;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
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
  filteredInterviewList!: any[];
  jobs!: Job[];
  job: any;
  jobId!: string | null;

  constructor(
    private snackbarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute,
    private JobProvider: JobProvider,
    private dialogService: ConfirmDialogService,
    private InterviewsProvider: InterviewsProvider,
  ) {
    this._unsubscribeAll = new Subject();
  }

  async ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id');
    this.getInterviewList();
    this.filteredInterviewList = this.interviews;
    this.initFilter();
  }

  // async getInterviewList() {
  //   try {
  //     this.filteredInterviewList = this.interviews =
  //       await this.JobProvider.findAll();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async getInterviewList() {
    try {
      const interviews = await this.JobProvider.getFollowUpInterviews(
        this.jobId
      );
     
      interviews.map((interview: any) => {
        this.interviews.push(new JobPanelModel(interview));
      });
      
      this.interviewsTable.renderRows();
      console.log(this.interviews)
      
    } catch (error) {
      console.error(error);
    }
  }

  editInterview(interviewId: any) {
    this.router.navigate([`interview/${interviewId}`]);
  }

  async deleteCollaborator(interviewId: any) {
    const options = {
      data: {
        title: 'Anteção',
        subtitle: 'Você tem certeza que deseja excluir esta entrevista?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async (confirmed) => {
      if (confirmed) {
        try {
          const collaborators = await this.InterviewsProvider.destroy(
            interviewId
          );
          this.getInterviewList();

          this.snackbarService.successMessage(
            'Colaborador Excluido Com Sucesso'
          );
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Excluir');
          this.getInterviewList();
        }
      }
    });
  }

  navigateJobs() {
    const navigationExtras = {
      state: {
        id: this.jobId,
      },
    };
    this.router.navigate(['vaga/interview/novo'], navigationExtras);
  }

  createJob() {
    this.router.navigate(['vaga/novo']);
  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())

      .subscribe((res) => {
        this.filteredInterviewList = this.interviews.filter((interview) =>
          interview.nameCandidate
            .toLocaleLowerCase()
            .includes(this.filter.nativeElement.value.toLocaleLowerCase())
        );
      });
  }
}
