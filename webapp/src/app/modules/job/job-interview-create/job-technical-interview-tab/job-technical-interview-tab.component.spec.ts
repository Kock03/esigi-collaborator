import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTechnicalInterviewTabComponent } from './job-technical-interview-tab.component';

describe('JobTechnicalInterviewTabComponent', () => {
  let component: JobTechnicalInterviewTabComponent;
  let fixture: ComponentFixture<JobTechnicalInterviewTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobTechnicalInterviewTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTechnicalInterviewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
