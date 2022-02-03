import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobInterviewTabComponent } from './job-interview-tab.component';

describe('JobInterviewTabComponent', () => {
  let component: JobInterviewTabComponent;
  let fixture: ComponentFixture<JobInterviewTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobInterviewTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobInterviewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
