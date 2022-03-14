import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorDocumentTabComponent } from './collaborator-document-tab.component';

describe('CollaboratorDocumentTabComponent', () => {
  let component: CollaboratorDocumentTabComponent;
  let fixture: ComponentFixture<CollaboratorDocumentTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollaboratorDocumentTabComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorDocumentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
