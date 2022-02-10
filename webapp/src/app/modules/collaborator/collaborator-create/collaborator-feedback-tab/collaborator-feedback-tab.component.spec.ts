import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorFeedbackTabComponent } from './collaborator-feedback-tab.component';

describe('CollaboratorFeedbackTabComponent', () => {
  let component: CollaboratorFeedbackTabComponent;
  let fixture: ComponentFixture<CollaboratorFeedbackTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorFeedbackTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorFeedbackTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
