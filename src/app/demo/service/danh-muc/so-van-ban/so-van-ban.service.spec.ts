import { TestBed } from '@angular/core/testing';

import { SoVanBanService } from './so-van-ban.service';

describe('SoVanBanService', () => {
  let service: SoVanBanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoVanBanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
