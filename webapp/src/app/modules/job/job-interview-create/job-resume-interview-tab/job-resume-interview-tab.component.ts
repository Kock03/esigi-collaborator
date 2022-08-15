import { Component, OnInit } from '@angular/core';
import { ResumeProvider } from 'src/providers/resume-providers/resume.provider';

@Component({
  selector: 'app-job-resume-interview-tab',
  templateUrl: './job-resume-interview-tab.component.html',
  styleUrls: ['./job-resume-interview-tab.component.scss']
})
export class JobResumeInterviewTabComponent implements OnInit {

  resume: any;
  resumeId: any;
  constructor(private resumeProvider: ResumeProvider) { }

  ngOnInit(): void {
    this.resumeId = sessionStorage.getItem('resume_id');
    this.getResume()
  }

  async getResume() {
    this.resume = await this.resumeProvider.findOne(this.resumeId)
  }

}
