import { TestBed } from '@angular/core/testing';

import { VanBanKySoDaKyService } from './van-ban-ky-so-da-ky.service';

describe('VanBanKySoDaKyService', () => {
  let service: VanBanKySoDaKyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VanBanKySoDaKyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
