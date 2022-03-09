import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeEducationTabComponent } from './resume-education-tab.component';

describe('ResumeEducationTabComponent', () => {
  let component: ResumeEducationTabComponent;
  let fixture: ComponentFixture<ResumeEducationTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumeEducationTabComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeEducationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
