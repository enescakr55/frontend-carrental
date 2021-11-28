import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarManagementComponent } from './admin-car-management.component';

describe('AdminCarManagementComponent', () => {
  let component: AdminCarManagementComponent;
  let fixture: ComponentFixture<AdminCarManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCarManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCarManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
