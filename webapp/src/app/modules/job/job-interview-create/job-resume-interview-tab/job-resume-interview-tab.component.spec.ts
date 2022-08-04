import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobResumeInterviewTabComponent } from './job-resume-interview-tab.component';

describe('JobResumeInterviewTabComponent', () => {
  let component: JobResumeInterviewTabComponent;
  let fixture: ComponentFixture<JobResumeInterviewTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobResumeInterviewTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobResumeInterviewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
