import { TestBed } from '@angular/core/testing';

import { VanBanKySoDaDuyetService } from './van-ban-ky-so-da-duyet.service';

describe('VanBanKySoDaDuyetService', () => {
  let service: VanBanKySoDaDuyetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VanBanKySoDaDuyetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
