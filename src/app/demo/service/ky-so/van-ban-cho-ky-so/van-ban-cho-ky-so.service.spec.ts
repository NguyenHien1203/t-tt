import { TestBed } from '@angular/core/testing';

import { VanBanChoKySoService } from './van-ban-cho-ky-so.service';

describe('VanBanChoKySoService', () => {
  let service: VanBanChoKySoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VanBanChoKySoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
