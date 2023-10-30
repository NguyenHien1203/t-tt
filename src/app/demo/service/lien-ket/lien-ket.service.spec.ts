import { TestBed } from '@angular/core/testing';

import { LienKetService } from './lien-ket.service';

describe('LienKetService', () => {
  let service: LienKetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LienKetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
