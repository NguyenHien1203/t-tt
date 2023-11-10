import { TestBed } from '@angular/core/testing';

import { CoQuanBanHanhService } from './co-quan-ban-hanh.service';

describe('CoQuanBanHanhService', () => {
  let service: CoQuanBanHanhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoQuanBanHanhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
