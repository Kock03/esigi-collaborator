import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobProvider } from 'src/providers/job.provider';
import { Location } from '@angular/common';
import { IJob } from 'src/app/interfaces/ijob';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
@Component({
  selector: 'app-job-detail-list-tab',
  templateUrl: './job-detail-list-tab.component.html',
  styleUrls: ['./job-detail-list-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobDetailListTabComponent implements OnInit {
  jobId!: string | null;
  job!: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private jobProvider: JobProvider,
    private collaboratorProvider: CollaboratorProvider,
  ) {}

  ngOnInit(): void {
    const state: any = this._location.getState();
    this.jobId = this.route.snapshot.paramMap.get('id');
    this.getJob();
  }

  async getJob() {
    try {
      this.job = await this.jobProvider.findOne(this.jobId);
      const collaboratorId = this.job.collaboratorRequesterId;
      
      const collaborator = await this.collaboratorProvider.findOne(collaboratorId);
      console.log(collaborator)
    } catch (error) {
      console.error(error);
    }
  }
}
