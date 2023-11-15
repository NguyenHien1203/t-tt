import { TestBed } from '@angular/core/testing';

import { NhomDonViService } from './nhom-don-vi.service';

describe('NhomDonViService', () => {
  let service: NhomDonViService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhomDonViService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
