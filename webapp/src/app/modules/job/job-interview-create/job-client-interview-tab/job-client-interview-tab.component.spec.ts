import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobClientInterviewTabComponent } from './job-client-interview-tab.component';

describe('JobClientInterviewTabComponent', () => {
  let component: JobClientInterviewTabComponent;
  let fixture: ComponentFixture<JobClientInterviewTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobClientInterviewTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobClientInterviewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
