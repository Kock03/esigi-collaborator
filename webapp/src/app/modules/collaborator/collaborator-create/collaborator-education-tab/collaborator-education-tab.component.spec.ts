import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorEducationTabComponent } from './collaborator-education-tab.component';

describe('CollaboratorEducationTabComponent', () => {
  let component: CollaboratorEducationTabComponent;
  let fixture: ComponentFixture<CollaboratorEducationTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollaboratorEducationTabComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorEducationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
