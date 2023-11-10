import { TestBed } from '@angular/core/testing';

import { CapNhatMoiService } from './cap-nhat-moi.service';

describe('CapNhatMoiService', () => {
  let service: CapNhatMoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapNhatMoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
