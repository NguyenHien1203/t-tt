import { TestBed } from '@angular/core/testing';

import { DonViService } from './don-vi.service';

describe('DonViService', () => {
  let service: DonViService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonViService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
