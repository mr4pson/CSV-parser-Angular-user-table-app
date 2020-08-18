import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTablePageComponent } from './user-table-page.component';

describe('UserTablePageComponent', () => {
  let component: UserTablePageComponent;
  let fixture: ComponentFixture<UserTablePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTablePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
