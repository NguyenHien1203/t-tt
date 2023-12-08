import { TestBed } from '@angular/core/testing';

import { QuanLyHoSoCoQuanService } from './quan-ly-ho-so-co-quan.service';

describe('QuanLyHoSoCoQuanService', () => {
  let service: QuanLyHoSoCoQuanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanLyHoSoCoQuanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
