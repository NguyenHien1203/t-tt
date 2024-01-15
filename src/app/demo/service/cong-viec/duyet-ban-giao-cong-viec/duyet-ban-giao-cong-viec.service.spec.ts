import { TestBed } from '@angular/core/testing';

import { DuyetBanGiaoCongViecService } from './duyet-ban-giao-cong-viec.service';

describe('DuyetBanGiaoCongViecService', () => {
  let service: DuyetBanGiaoCongViecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuyetBanGiaoCongViecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
