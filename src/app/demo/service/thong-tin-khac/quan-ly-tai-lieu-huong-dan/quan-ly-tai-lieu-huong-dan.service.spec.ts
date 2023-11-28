import { TestBed } from '@angular/core/testing';

import { QuanLyTaiLieuHuongDanService } from './quan-ly-tai-lieu-huong-dan.service';

describe('QuanLyTaiLieuHuongDanService', () => {
  let service: QuanLyTaiLieuHuongDanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanLyTaiLieuHuongDanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
