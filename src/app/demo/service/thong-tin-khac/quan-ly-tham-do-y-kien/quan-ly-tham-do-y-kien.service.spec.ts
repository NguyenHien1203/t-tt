import { TestBed } from '@angular/core/testing';

import { QuanLyThamDoYKienService } from './quan-ly-tham-do-y-kien.service';

describe('QuanLyThamDoYKienService', () => {
  let service: QuanLyThamDoYKienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanLyThamDoYKienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
