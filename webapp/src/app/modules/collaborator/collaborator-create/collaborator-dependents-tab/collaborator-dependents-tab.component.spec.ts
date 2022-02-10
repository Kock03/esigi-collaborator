import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorDependentsTabComponent } from './collaborator-dependents-tab.component';

describe('CollaboratorDependentsTabComponent', () => {
  let component: CollaboratorDependentsTabComponent;
  let fixture: ComponentFixture<CollaboratorDependentsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorDependentsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorDependentsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
