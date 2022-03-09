import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingActiveDirectoryComponent } from './setting-active-directory.component';

describe('SettingActiveDirectoryComponent', () => {
  let component: SettingActiveDirectoryComponent;
  let fixture: ComponentFixture<SettingActiveDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingActiveDirectoryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingActiveDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
