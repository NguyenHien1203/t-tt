import { TestBed } from '@angular/core/testing';

import { TimKiemTheoSoVanBanService } from './tim-kiem-theo-so-van-ban.service';

describe('TimKiemTheoSoVanBanService', () => {
  let service: TimKiemTheoSoVanBanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimKiemTheoSoVanBanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
