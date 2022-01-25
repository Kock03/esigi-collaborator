import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
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
  displayedJob: string[] = ['jobName', 'client', 'requester'];
  jobs!: Job[];

  constructor(private router: Router, private jobProvider: JobProvider) {}

  ngOnInit(): void {

  }

  createJob() {
    this.router.navigate(['vaga/novo']);
  }

  async getJobList() {
    try {
      this.jobs = await this.jobProvider.findAll();
    } catch (error) {
      console.error(error);
    }
  }
}
