import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobProvider } from 'src/providers/job.provider';
import { Location } from "@angular/common";

export interface Job {
  jobName: string;
}

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent implements OnInit {
  job: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit(): void {
    const state: any = this._location.getState();
    this.job = state["job"]
    console.log("🚀 ~ file: job-detail.component.ts ~ line 25 ~ JobDetailComponent ~ ngOnInit ~ state", this.job)
  }

 
}
