import { TestBed } from '@angular/core/testing';

import { CapNhatTienDoService } from './cap-nhat-tien-do.service';

describe('CapNhatTienDoService', () => {
  let service: CapNhatTienDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapNhatTienDoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
