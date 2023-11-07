import { TestBed } from '@angular/core/testing';

import { XemThongBaoService } from './xem-thong-bao.service';

describe('XemThongBaoService', () => {
  let service: XemThongBaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XemThongBaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
