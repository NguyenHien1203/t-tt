import { TestBed } from '@angular/core/testing';

import { DuyetVanBanTrinhKyService } from './duyet-van-ban-trinh-ky.service';

describe('DuyetVanBanTrinhKyService', () => {
  let service: DuyetVanBanTrinhKyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuyetVanBanTrinhKyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
