import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSkillTabComponent } from './job-skill-tab.component';

describe('JobSkillTabComponent', () => {
  let component: JobSkillTabComponent;
  let fixture: ComponentFixture<JobSkillTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobSkillTabComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSkillTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
