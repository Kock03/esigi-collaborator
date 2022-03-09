import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRegisterTabComponent } from './job-register-tab.component';

describe('JobRegisterTabComponent', () => {
  let component: JobRegisterTabComponent;
  let fixture: ComponentFixture<JobRegisterTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobRegisterTabComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRegisterTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
