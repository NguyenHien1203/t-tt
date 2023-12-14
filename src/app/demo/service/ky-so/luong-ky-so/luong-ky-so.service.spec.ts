import { TestBed } from '@angular/core/testing';

import { LuongKySoService } from './luong-ky-so.service';

describe('LuongKySoService', () => {
  let service: LuongKySoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LuongKySoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
