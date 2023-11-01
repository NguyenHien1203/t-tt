import { TestBed } from '@angular/core/testing';

import { QuanLyThongBaoService } from './quan-ly-thong-bao.service';

describe('QuanLyThongBaoService', () => {
  let service: QuanLyThongBaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanLyThongBaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
