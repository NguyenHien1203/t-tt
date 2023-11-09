import { TestBed } from '@angular/core/testing';

import { LoaiVanBanDenService } from './loai-van-ban-den.service';

describe('LoaiVanBanDenService', () => {
  let service: LoaiVanBanDenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaiVanBanDenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
