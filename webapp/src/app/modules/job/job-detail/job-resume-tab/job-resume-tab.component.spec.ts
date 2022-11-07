import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobResumeTabComponent } from './job-resume-tab.component';

describe('JobResumeTabComponent', () => {
  let component: JobResumeTabComponent;
  let fixture: ComponentFixture<JobResumeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobResumeTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobResumeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
