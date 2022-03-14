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
import { JobProvider } from 'src/providers/job.provider';
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

  // sortData(sort: any) {
  //   const data = this.filteredJobList.data.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.filteredJobList.data = data;
  //     return;
  //   }

  //   this.filteredJobList.data = data.sort((a: any, b: any) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'jobName':
  //         return compare(a.jobName, b.jobName, isAsc);
  //       default:
  //         return 0;
  //     }
  //   });

  //   function compare(a: number | string, b: number | string, isAsc: boolean) {
  //     return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  //   }
  // }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  createJob() {
    this.router.navigate(['vaga/novo']);
  }

  async getJobList() {
    try {
      this.filteredJobList.data = this.jobs = await this.jobProvider.findAll();
      this.filteredJobList.sort = this.sort;
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
        this.filteredJobList.data = this.jobs.filter((job) =>
          job.jobName
            .toLocaleLowerCase()
            .includes(this.filter.nativeElement.value.toLocaleLowerCase())
        );
      });
  }

  async deleteJob(jobId: any) {
    const options = {
      data: {
        title: 'Anteção',
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
