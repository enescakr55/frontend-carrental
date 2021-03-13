import { TestBed } from '@angular/core/testing';

import { CardetailsService } from './cardetails.service';

describe('CardetailsService', () => {
  let service: CardetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
