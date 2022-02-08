import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobProvider } from 'src/providers/job.provider';
import { Location } from '@angular/common';

export interface Job {
  jobName: string;
  client: string;
  requester: string;
  openingDate: string;
  status: number;
  typeOfJob: number;
  temporary: boolean;
  monthTime: string;
  startForecast: string;
  jobNumber: number;
  typeOfContract: number;
  workplace: number;
  workingDay: string;
  Seniorities: {
    intern: boolean;
    junior: boolean;
    pleno: boolean;
    senior: boolean;
  };
  minimumValue: number;
  maximumValue: number;
  publish: boolean;
  schooling: number;
  Languages: Languanges[];
  Knowledges: Knowledges[];
  collaboratorActivities: string;
  skills: string;
  attitudes: string;
}

export interface Languanges {
  languageName: string;
  degreeOfInfluence: number;
}

export interface Knowledges {
  name: string;
  yearsExperience: number;
  typeOfPeriod: number;
}

@Component({
  selector: 'app-job-detail-list-tab',
  templateUrl: './job-detail-list-tab.component.html',
  styleUrls: ['./job-detail-list-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobDetailListTabComponent implements OnInit {
  jobId!: string | null;
  job!: Job;

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
      console.log(this.job);
    } catch (error) {
      console.error(error);
    }
  }
}
