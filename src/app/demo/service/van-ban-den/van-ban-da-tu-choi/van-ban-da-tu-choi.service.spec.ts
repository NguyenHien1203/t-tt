import { TestBed } from '@angular/core/testing';

import { VanBanDaTuChoiService } from './van-ban-da-tu-choi.service';

describe('VanBanDaTuChoiService', () => {
  let service: VanBanDaTuChoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VanBanDaTuChoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
