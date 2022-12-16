import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobProvider } from 'src/providers/job-providers/job.provider';
import { Location } from '@angular/common';
import { IJob } from 'src/app/interfaces/ijob';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { ResumeProvider } from 'src/providers/resume-providers/resume.provider';
import { CustomerProvider } from 'src/providers/customer.provider';
import { ContactProvider } from 'src/providers/contact.provier';

export interface ICollaborator {
  firstNameCorporateName: string;
  lastNameFantasyName: string;
}
export interface ICustomer {
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
  method: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private jobProvider: JobProvider,
    private customerProvider: CustomerProvider,
    private collaboratorProvider: CollaboratorProvider,
    private contactProvider: ContactProvider

  ) { }

  ngOnInit(): void {
    const state: any = this._location.getState();
    this.jobId = this.route.snapshot.paramMap.get('id');
    this.getJob();
  }

  async getJob() {
    try {
      this.job = await this.jobProvider.findOne(this.jobId);
      sessionStorage.setItem('customer_id', this.job.customerId)
      this.collaborator = await this.collaboratorProvider.findOne(this.job.collaboratorRequesterId);
      this.customer = await this.customerProvider.findOne(this.job.customerId);
    } catch (error) {
      console.error(error);
    }
  }

  editJob(jobId: any, customerId: any, collaboratorRequesterId: any) {
    sessionStorage.setItem('collaboratorRequester_id', collaboratorRequesterId);
    this.method = sessionStorage.setItem('job_method', 'edit');
    sessionStorage.setItem('customer_id', customerId);
    this.method = sessionStorage.setItem('job_method', 'edit');
    this.router.navigate([`vaga/${jobId}`]);

  }

}
