import { TestBed } from '@angular/core/testing';

import { DanhSachBanGiaoCongViecService } from './danh-sach-ban-giao-cong-viec.service';

describe('DanhSachBanGiaoCongViecService', () => {
  let service: DanhSachBanGiaoCongViecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhSachBanGiaoCongViecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
