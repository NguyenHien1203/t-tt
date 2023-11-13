import { TestBed } from '@angular/core/testing';

import { LoaiVanBanDiService } from './loai-van-ban-di.service';

describe('LoaiVanBanDiService', () => {
  let service: LoaiVanBanDiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaiVanBanDiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
