import { TestBed } from '@angular/core/testing';

import { TraCuuDonGianService } from './tra-cuu-don-gian.service';

describe('TraCuuDonGianService', () => {
  let service: TraCuuDonGianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraCuuDonGianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
