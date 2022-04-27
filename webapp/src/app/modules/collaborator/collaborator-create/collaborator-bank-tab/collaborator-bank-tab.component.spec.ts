import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorBankTabComponent } from './collaborator-bank-tab.component';

describe('CollaboratorBankTabComponent', () => {
  let component: CollaboratorBankTabComponent;
  let fixture: ComponentFixture<CollaboratorBankTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollaboratorBankTabComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorBankTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
