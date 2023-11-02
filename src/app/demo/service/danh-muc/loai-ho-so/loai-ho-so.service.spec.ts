import { TestBed } from '@angular/core/testing';

import { LoaiHoSoService } from './loai-ho-so.service';

describe('LoaiHoSoService', () => {
  let service: LoaiHoSoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaiHoSoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
