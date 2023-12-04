import { TestBed } from '@angular/core/testing';

import { TaiLieuHuongDanService } from './tai-lieu-huong-dan.service';

describe('TaiLieuHuongDanService', () => {
  let service: TaiLieuHuongDanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaiLieuHuongDanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
