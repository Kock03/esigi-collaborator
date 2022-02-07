import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {
  fromEvent,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  Subject,
} from 'rxjs';
import { JobProvider } from 'src/providers/job.provider';
import { SnackBarService } from 'src/services/snackbar.service';

export interface Job {
  id: string;
  jobName: string;
  client: string;
  requester: string;
  openingDate: string;
  status: number;
}

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobListComponent implements OnInit {
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  private _unsubscribeAll: Subject<any>;
  displayedJob: string[] = [
    'jobName',
    'client',
    'requester',
    'openingDate',
    'status',
    'icon',
  ];
  jobs!: Job[];
  filteredJobList!: any[];


  constructor(
    private snackbarService: SnackBarService,
    private router: Router,
    private jobProvider: JobProvider,
    private route: ActivatedRoute
  ) {
    this._unsubscribeAll = new Subject();
  }

  async ngOnInit() {
    this.getJobList();
    this.filteredJobList = this.jobs;
    this.initFilter();
  }

  createJob() {
    this.router.navigate(['vaga/novo']);
  }

  async getJobList() {
    try {
      this.filteredJobList = this.jobs = await this.jobProvider.findAll();
    } catch (error) {
      console.error(error);
    }
  }

  viewDetail(jobId: any) {
    this.router.navigate([`vaga/detalhe/${jobId}`]);
  }

  editJob(jobId: any) {
    this.router.navigate([`vaga/${jobId}`]);
  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())

      .subscribe((res) => {
        this.filteredJobList = this.jobs.filter((job) =>
          job.jobName
            .toLocaleLowerCase()
            .includes(this.filter.nativeElement.value.toLocaleLowerCase())
        );
      });
  }

  async deleteJob(jobId: any) {
    try {
      const jobs = await this.jobProvider.destroy(jobId);
      this.getJobList();

      this.snackbarService.successMessage('Vaga Apagada Com Sucesso');
    } catch (error) {
      console.log('ERROR 132' + error);
      this.snackbarService.showError('Falha ao Deletar');
    }
  }
}
