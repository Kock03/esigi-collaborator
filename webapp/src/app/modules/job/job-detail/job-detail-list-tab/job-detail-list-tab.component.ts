import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobProvider } from 'src/providers/job.provider';
import { Location } from '@angular/common';
import { IJob } from 'src/app/interfaces/ijob';
@Component({
  selector: 'app-job-detail-list-tab',
  templateUrl: './job-detail-list-tab.component.html',
  styleUrls: ['./job-detail-list-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobDetailListTabComponent implements OnInit {
  jobId!: string | null;
  job!: IJob;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private jobProvider: JobProvider
  ) {}

  ngOnInit(): void {
    const state: any = this._location.getState();
    this.jobId = this.route.snapshot.paramMap.get('id');
    this.getJob();
  }

  async getJob() {
    try {
      this.job = await this.jobProvider.findOne(this.jobId);
    } catch (error) {
      console.error(error);
    }
  }
}
