import { TestBed } from '@angular/core/testing';

import { LinhVucService } from './linh-vuc.service';

describe('LinhVucService', () => {
  let service: LinhVucService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinhVucService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
