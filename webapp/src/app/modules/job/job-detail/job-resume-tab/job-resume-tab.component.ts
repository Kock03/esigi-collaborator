import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, fromEvent, debounceTime, distinctUntilChanged } from 'rxjs';
import { IInterview } from 'src/app/interfaces/iinterview';
import { IJob } from 'src/app/interfaces/ijob';
import { SnackBarService } from 'src/services/snackbar.service';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { Job } from '../../job-list/job-list.component';
import { JobPanelModel } from 'src/models/job-panel-model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { InterviewsProvider } from 'src/providers/interview.provider';
import { FormGroup } from '@angular/forms';
import { JobProvider } from 'src/providers/job-providers/job.provider';

import { TechnicalInterviewProvider } from 'src/providers/technicalInterview.provider';
import { ClientInterviewProvider } from 'src/providers/clientInterview.provider';
import { CustomerProvider } from 'src/providers/customer.provider';
import { CollaboratorProvider } from 'src/providers/collaborator-providers/collaborator.provider';
import { Resume } from 'src/app/modules/resume/resume-list/resume-list.component';
import { ResumeProvider } from 'src/providers/resume-providers/resume.provider';
import { ResumeEducationProvider } from 'src/providers/resume-providers/resume-education.provider';
import { ResumeExperienceProvider } from 'src/providers/resume-providers/resume-experience.provider';
import { ResumeLanguageProvider } from 'src/providers/resume-providers/resume-language.provider';
import { ResumeSkillsProvider } from 'src/providers/resume-providers/resume-skills.provider';

export interface ICollaborator {
  firstNameCorporateName: string;
  lastNameFantasyName: string;
}

export interface ICustomer {
  corporateName: string;
}

@Component({
  selector: 'app-job-resume-tab',
  templateUrl: './job-resume-tab.component.html',
  styleUrls: ['./job-resume-tab.component.scss']
})
export class JobResumeTabComponent implements OnInit {
  @ViewChild('interviewsTable') interviewsTable!: MatTable<any>;
 
  displayedJob: string[] = [
    'nameCandidate',
    'candidacyDate',
    'origin',
    'status',
  ];
  interviews: IInterview[] = [];
  filteredInterviewList = new MatTableDataSource();
  jobId!: string | null;
  resumeStatus!: any;
  job: any;
  resume: any;
  resumeEducation: any;
  resumeExperience: any;
  resumeLanguage: any;
  resumeSkill: any;
  collaborator!: ICollaborator;
  customer!: ICustomer;
  viewResume: boolean = false;

  constructor(
    private jobProvider: JobProvider,
    private resumeProvider: ResumeProvider,
    private resumeEducationProvider: ResumeEducationProvider,
    private resumeExperienceProvider: ResumeExperienceProvider,
    private resumeLanguageProvider: ResumeLanguageProvider,
    private resumeSkillsProvider: ResumeSkillsProvider,
    private route: ActivatedRoute,
    private collaboratorProvider: CollaboratorProvider,
    private customerProvider: CustomerProvider,
    ) {}

  async ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id');
    this.getInterviewList();
    this.getJob();
    this.getResume
  }
  async getInterviewList() {
    try {
      const interviews = await this.jobProvider.getFollowUpInterviews(
        this.jobId
      );
      interviews.map((interview: any) => {
        this.interviews.push(new JobPanelModel(interview));
      });

      this.interviewsTable.renderRows();

    } catch (error) {
      console.error(error);
    }
  }

  async getJob() {
    try {
      this.job = await this.jobProvider.findOne(this.jobId);
      this.collaborator = await this.collaboratorProvider.findOne(this.job.collaboratorRequesterId);
      this.customer = await this.customerProvider.findOne(this.job.customerId);
    } catch (error) {
      console.error(error);
    }
  }

  async getResume(id: any){
    this.viewResume = true;
    try{
      const interviews = await this.jobProvider.getFollowUpInterviews(
        this.jobId
      );
      this.resume = await this.resumeProvider.findOne(interviews[id].name_candidate)
      console.log("🚀 ~ file: job-resume-tab.component.ts ~ line 121 ~ JobResumeTabComponent ~ getResume ~ this.resume", this.resume)
    }catch(error){
      console.error(error);
    }
  }

  backList(){
    this.viewResume = false;
  }
}
