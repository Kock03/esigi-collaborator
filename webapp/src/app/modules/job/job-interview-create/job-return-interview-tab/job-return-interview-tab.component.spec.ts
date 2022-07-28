import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobReturnInterviewTabComponent } from './job-return-interview-tab.component';

describe('JobReturnInterviewTabComponent', () => {
  let component: JobReturnInterviewTabComponent;
  let fixture: ComponentFixture<JobReturnInterviewTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobReturnInterviewTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobReturnInterviewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
