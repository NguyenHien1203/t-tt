import { TestBed } from '@angular/core/testing';

import { ThamDoYKienService } from './tham-do-y-kien.service';

describe('ThamDoYKienService', () => {
  let service: ThamDoYKienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThamDoYKienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
