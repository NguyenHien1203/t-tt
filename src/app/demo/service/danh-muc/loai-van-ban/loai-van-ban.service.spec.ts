import { TestBed } from '@angular/core/testing';

import { LoaiVanBanService } from './loai-van-ban.service';

describe('LoaiVanBanService', () => {
  let service: LoaiVanBanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaiVanBanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
