import { TestBed } from '@angular/core/testing';

import { VanBanChoPhatHanhService } from './van-ban-cho-phat-hanh.service';

describe('VanBanChoPhatHanhService', () => {
  let service: VanBanChoPhatHanhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VanBanChoPhatHanhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
