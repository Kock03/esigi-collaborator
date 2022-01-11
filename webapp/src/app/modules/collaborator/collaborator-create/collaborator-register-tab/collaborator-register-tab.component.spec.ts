import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorRegisterTabComponent } from './collaborator-register-tab.component';

describe('CollaboratorRegisterTabComponent', () => {
  let component: CollaboratorRegisterTabComponent;
  let fixture: ComponentFixture<CollaboratorRegisterTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorRegisterTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorRegisterTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
