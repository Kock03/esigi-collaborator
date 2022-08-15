import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {
  fromEvent,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  Subject,
} from 'rxjs';
import { JobProvider } from 'src/providers/job-providers/job.provider';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
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
  @ViewChild(MatSort) sort: MatSort = new MatSort();

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
  filteredJobList = new MatTableDataSource();
  method: any;

  constructor(
    private liveAnnouncer: LiveAnnouncer,
    private snackbarService: SnackBarService,
    private router: Router,
    private jobProvider: JobProvider,
    private route: ActivatedRoute,
    private dialogService: ConfirmDialogService
  ) {
    this._unsubscribeAll = new Subject();
  }

  async ngOnInit() {
    await this.getJobList();
    this.initFilter();
  }



  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  createJob() {
    this.router.navigate(['vaga/novo']);
    this.method = sessionStorage.setItem('job_method', 'novo');
  }

  async getJobList() {
    try {
      this.filteredJobList.data = this.jobs = await this.jobProvider.findAll();
      this.filteredJobList.sort = this.sort;
    } catch (error) {
      console.error(error);
    }
  }

  async searchJobs(query?: string) {
    try {
      this.jobs = await this.jobProvider.findByName(query);
    } catch (error) {
      console.error(error);
    }
  }

  viewDetail(jobId: any) {
    this.router.navigate([`vaga/detalhe/${jobId}`]);

  }

  editJob(jobId: any, customerId: any, collaboratorRequesterId: any) {
    console.log(customerId)
    sessionStorage.setItem('customer_id', customerId);
    sessionStorage.setItem('collaboratorRequester_id', collaboratorRequesterId);
    this.method = sessionStorage.setItem('job_method', 'edit');
    sessionStorage.setItem('job_id', jobId);
    this.router.navigate([`vaga/${jobId}`]);

  }

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())

      .subscribe((res) => {
        this.filteredJobList.data = this.jobs.filter((job) =>
          job.jobName
            .toLocaleLowerCase()
            .includes(this.filter.nativeElement.value.toLocaleLowerCase())
        )
        const params = `jobName=${this.filter.nativeElement.value}`;
        this.searchJobs(params);
      });
  }

  async deleteJob(jobId: any) {
    const options = {
      data: {
        title: 'Atenção',
        subtitle: 'Você tem certeza que deseja excluir esta vaga?',
      },
      panelClass: 'confirm-modal',
    };

    this.dialogService.open(options);

    this.dialogService.confirmed().subscribe(async confirmed => {
      if (confirmed) {
        try {
          const jobs = await this.jobProvider.destroy(jobId);
          this.getJobList();

          this.snackbarService.successMessage('Vaga Excluída Com Sucesso');
        } catch (error) {
          console.log('ERROR 132' + error);
          this.snackbarService.showError('Falha ao Deletar');
        }
      }
    });
  }
}
