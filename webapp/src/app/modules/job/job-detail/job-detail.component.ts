import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobProvider } from 'src/providers/job.provider';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
 



  constructor(   private route: ActivatedRoute, private jobProvider: JobProvider) { }

  ngOnInit(): void {
  }


}
