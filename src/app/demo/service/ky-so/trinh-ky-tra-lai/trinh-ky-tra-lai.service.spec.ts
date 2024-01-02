import { TestBed } from '@angular/core/testing';

import { TrinhKyTraLaiService } from './trinh-ky-tra-lai.service';

describe('TrinhKyTraLaiService', () => {
  let service: TrinhKyTraLaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrinhKyTraLaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
