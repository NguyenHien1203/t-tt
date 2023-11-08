import { TestBed } from '@angular/core/testing';

import { XemBangLuongService } from './xem-bang-luong.service';

describe('XemBangLuongService', () => {
  let service: XemBangLuongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XemBangLuongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
