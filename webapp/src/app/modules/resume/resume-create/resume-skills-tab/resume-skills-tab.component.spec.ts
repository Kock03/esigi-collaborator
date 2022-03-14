import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSkillsTabComponent } from './resume-skills-tab.component';

describe('ResumeSkillsTabComponent', () => {
  let component: ResumeSkillsTabComponent;
  let fixture: ComponentFixture<ResumeSkillsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumeSkillsTabComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeSkillsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
