import { TestBed } from '@angular/core/testing';

import { QuanLyBangLuongService } from './quan-ly-bang-luong.service';

describe('QuanLyBangLuongService', () => {
  let service: QuanLyBangLuongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanLyBangLuongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
