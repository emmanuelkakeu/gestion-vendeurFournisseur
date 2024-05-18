import { TestBed } from '@angular/core/testing';

import { GasRetailerService } from './gas-retailer.service';

describe('GasRetailerService', () => {
  let service: GasRetailerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GasRetailerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
