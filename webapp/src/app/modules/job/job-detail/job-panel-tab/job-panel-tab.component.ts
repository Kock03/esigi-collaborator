import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, fromEvent, debounceTime, distinctUntilChanged } from 'rxjs';
import { IInterview } from 'src/app/interfaces/iinterview';
import { IJob } from 'src/app/interfaces/ijob';
import { SnackBarService } from 'src/services/snackbar.service';
import { JobProvider } from 'src/providers/job.provider';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { Job } from '../../job-list/job-list.component';
// import { IInterview } from 'src/app/interfaces/iinterview';


@Component({
  selector: 'app-job-panel-tab',
  templateUrl: './job-panel-tab.component.html',
  styleUrls: ['./job-panel-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobPanelTabComponent implements OnInit {
  [x: string]: any;
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
  interviews!: IInterview[];
  filteredInterviewList!: any[];
  jobs!: Job[];
  job: any;
  jobId!: string | null;


  constructor(
    private snackbarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute,
    private JobProvider: JobProvider,
    private dialogService: ConfirmDialogService
  ) {
    this._unsubscribeAll = new Subject();
  }

  async ngOnInit() {
    // this.getInterviewList();
    this.jobId = this.route.snapshot.paramMap.get('id')
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
      this.job = await this.JobProvider.getFollowUpInterviews(this.jobId);
      console.log("🚀 ~ file: job-panel-tab.component.ts ~ line 68 ~ JobPanelTabComponent ~ getInterviewList ~ this.job ", this.job )
       this.interviews = this.job.Jobs
    } catch (error) {
      console.error(error);
    }
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

  // async getInterviewList() {
  //   try {
  //     this.filteredInterviewList = this.interviews = await this.interviewProvider.findAll();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }



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

  // async deleteInterview(interviewId: any) {
  //   try {
  //     const interviews = await this.interviewProvider.destroy(interviewId);
  //     this.getInterviewList();

  //     this.snackbarService.successMessage('Entrevista Apagada Com Sucesso');
  //   } catch (error) {
  //     console.log('ERROR 132' + error);
  //     this.snackbarService.showError('Falha ao Deletar');
  //   }
  // }

}
