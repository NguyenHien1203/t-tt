import { TestBed } from '@angular/core/testing';

import { DanhSachDeXuatCongViecService } from './danh-sach-de-xuat-cong-viec.service';

describe('DanhSachDeXuatCongViecService', () => {
  let service: DanhSachDeXuatCongViecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhSachDeXuatCongViecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
