import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobProvider } from 'src/providers/job.provider';
import { Location } from '@angular/common';
import { IJob } from 'src/app/interfaces/ijob';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { ResumeProvider } from 'src/providers/resume-providers/resume.provider';
import { CustomerProvider } from 'src/providers/customer.provider';

export interface ICollaborator{
  firstNameCorporateName: string;
  lastNameFantasyName: string;
}
export interface ICustomer{
corporateName: string;
}
@Component({
  selector: 'app-job-detail-list-tab',
  templateUrl: './job-detail-list-tab.component.html',
  styleUrls: ['./job-detail-list-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobDetailListTabComponent implements OnInit {
  jobId!: string | null;
  job!: any;
  collaborator!: ICollaborator;
  customer!: ICustomer;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private jobProvider: JobProvider,
    private customerProvider: CustomerProvider,
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
      this.collaborator = await this.collaboratorProvider.findOne(this.job.collaboratorRequesterId);
      this.customer = await  this.customerProvider.findOne(this.job.customerId);
    } catch (error) {
      console.error(error);
    }
  }
}
