import { TestBed } from '@angular/core/testing';

import { DuyetNhiemVuService } from './duyet-nhiem-vu.service';

describe('DuyetNhiemVuService', () => {
  let service: DuyetNhiemVuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuyetNhiemVuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
