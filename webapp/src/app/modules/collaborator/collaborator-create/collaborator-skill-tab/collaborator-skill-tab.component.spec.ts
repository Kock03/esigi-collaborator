import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorSkillTabComponent } from './collaborator-skill-tab.component';

describe('CollaboratorSkillTabComponent', () => {
  let component: CollaboratorSkillTabComponent;
  let fixture: ComponentFixture<CollaboratorSkillTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorSkillTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorSkillTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
