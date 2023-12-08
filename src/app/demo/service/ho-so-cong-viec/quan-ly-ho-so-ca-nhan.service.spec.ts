import { TestBed } from '@angular/core/testing';

import { QuanLyHoSoCaNhanService } from './quan-ly-ho-so-ca-nhan.service';

describe('QuanLyHoSoCaNhanService', () => {
  let service: QuanLyHoSoCaNhanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanLyHoSoCaNhanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
