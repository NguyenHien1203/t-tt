import { TestBed } from '@angular/core/testing';

import { DanhbaService } from './danhba.service';

describe('DanhbaService', () => {
  let service: DanhbaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhbaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
