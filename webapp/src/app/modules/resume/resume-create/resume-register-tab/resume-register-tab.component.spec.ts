import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeRegisterTabComponent } from './resume-register-tab.component';

describe('ResumeRegisterTabComponent', () => {
  let component: ResumeRegisterTabComponent;
  let fixture: ComponentFixture<ResumeRegisterTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeRegisterTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeRegisterTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
