import { TestBed } from '@angular/core/testing';

import { QuanTriVanBanService } from './quan-tri-van-ban.service';

describe('QuanTriVanBanService', () => {
  let service: QuanTriVanBanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanTriVanBanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
