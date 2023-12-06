import { TestBed } from '@angular/core/testing';

import { HoatDongSapToiService } from './hoat-dong-sap-toi.service';

describe('HoatDongSapToiService', () => {
  let service: HoatDongSapToiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoatDongSapToiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
