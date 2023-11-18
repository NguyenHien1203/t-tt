import { TestBed } from '@angular/core/testing';

import { TheoDoiVanBanDiService } from './theo-doi-van-ban-di.service';

describe('TheoDoiVanBanDiService', () => {
  let service: TheoDoiVanBanDiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheoDoiVanBanDiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
