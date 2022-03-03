import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobInterviewCreateComponent } from './job-interview-create.component';

describe('JobInterviewCreateComponent', () => {
  let component: JobInterviewCreateComponent;
  let fixture: ComponentFixture<JobInterviewCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobInterviewCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobInterviewCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
