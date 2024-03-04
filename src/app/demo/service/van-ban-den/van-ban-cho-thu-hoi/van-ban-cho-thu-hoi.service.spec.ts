import { TestBed } from '@angular/core/testing';

import { VanBanChoThuHoiService } from './van-ban-cho-thu-hoi.service';

describe('VanBanChoThuHoiService', () => {
  let service: VanBanChoThuHoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VanBanChoThuHoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
