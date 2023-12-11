import { TestBed } from '@angular/core/testing';

import { TraCuuNangCaoService } from './tra-cuu-nang-cao.service';

describe('TraCuuNangCaoService', () => {
  let service: TraCuuNangCaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraCuuNangCaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
