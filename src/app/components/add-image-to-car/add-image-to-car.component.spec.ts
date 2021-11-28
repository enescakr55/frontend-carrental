import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImageToCarComponent } from './add-image-to-car.component';

describe('AddImageToCarComponent', () => {
  let component: AddImageToCarComponent;
  let fixture: ComponentFixture<AddImageToCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImageToCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImageToCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
