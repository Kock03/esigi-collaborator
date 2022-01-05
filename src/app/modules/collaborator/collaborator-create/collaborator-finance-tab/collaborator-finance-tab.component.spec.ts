import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorFinanceTabComponent } from './collaborator-finance-tab.component';

describe('CollaboratorFinanceTabComponent', () => {
  let component: CollaboratorFinanceTabComponent;
  let fixture: ComponentFixture<CollaboratorFinanceTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorFinanceTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorFinanceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
