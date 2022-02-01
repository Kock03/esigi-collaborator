import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  fromEvent,
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  Subject,
} from 'rxjs';
import { JobProvider } from 'src/providers/job.provider';

export interface Job {
  jobName: string;
  client: string;
  requester: string;
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
  displayedJob: string[] = ['jobName', 'client', 'requester'];
  jobs!: Job[];
  filteredJobList!: any[];

  constructor(private router: Router, private jobProvider: JobProvider) {
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

  initFilter() {
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged())

      .subscribe((res) => {
        this.filteredJobList = this.jobs.filter((job) =>
          job.jobName.toLocaleLowerCase().includes(this.filter.nativeElement.value.toLocaleLowerCase())
        );
      });
  }
}
