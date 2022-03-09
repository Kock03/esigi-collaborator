import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeExperienceTabComponent } from './resume-experience-tab.component';

describe('ResumeExperienceTabComponent', () => {
  let component: ResumeExperienceTabComponent;
  let fixture: ComponentFixture<ResumeExperienceTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumeExperienceTabComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeExperienceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
