import { TestBed } from '@angular/core/testing';

import { TrinhKyVanBanService } from './trinh-ky-van-ban.service';

describe('TrinhKyVanBanService', () => {
  let service: TrinhKyVanBanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrinhKyVanBanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
