import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPanelTabComponent } from './job-panel-tab.component';

describe('JobPanelTabComponent', () => {
  let component: JobPanelTabComponent;
  let fixture: ComponentFixture<JobPanelTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPanelTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPanelTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
