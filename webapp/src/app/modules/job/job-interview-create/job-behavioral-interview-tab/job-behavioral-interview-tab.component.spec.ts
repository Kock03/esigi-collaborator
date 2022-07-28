import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBehavioralInterviewTabComponent } from './job-behavioral-interview-tab.component';

describe('JobBehavioralInterviewTabComponent', () => {
  let component: JobBehavioralInterviewTabComponent;
  let fixture: ComponentFixture<JobBehavioralInterviewTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobBehavioralInterviewTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBehavioralInterviewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
