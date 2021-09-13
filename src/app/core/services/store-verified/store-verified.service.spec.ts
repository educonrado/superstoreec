import { TestBed } from '@angular/core/testing';

import { StoreVerifiedService } from './store-verified.service';

describe('StoreVerifiedService', () => {
  let service: StoreVerifiedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreVerifiedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
