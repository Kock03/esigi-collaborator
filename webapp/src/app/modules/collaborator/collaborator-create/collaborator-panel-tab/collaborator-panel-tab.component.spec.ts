import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorPanelTabComponent } from './collaborator-panel-tab.component';

describe('CollaboratorPanelTabComponent', () => {
  let component: CollaboratorPanelTabComponent;
  let fixture: ComponentFixture<CollaboratorPanelTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollaboratorPanelTabComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorPanelTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
