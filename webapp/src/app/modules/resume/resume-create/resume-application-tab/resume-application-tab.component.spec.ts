import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeApplicationTabComponent } from './resume-application-tab.component';

describe('ResumeApplicationTabComponent', () => {
  let component: ResumeApplicationTabComponent;
  let fixture: ComponentFixture<ResumeApplicationTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumeApplicationTabComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeApplicationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
