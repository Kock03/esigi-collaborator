import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeMonitoringTabComponent } from './resume-monitoring-tab.component';

describe('ResumeMonitoringTabComponent', () => {
  let component: ResumeMonitoringTabComponent;
  let fixture: ComponentFixture<ResumeMonitoringTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumeMonitoringTabComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeMonitoringTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
