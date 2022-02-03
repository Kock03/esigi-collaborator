import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailListTabComponent } from './job-detail-list-tab.component';

describe('JobDetailListTabComponent', () => {
  let component: JobDetailListTabComponent;
  let fixture: ComponentFixture<JobDetailListTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDetailListTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailListTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
