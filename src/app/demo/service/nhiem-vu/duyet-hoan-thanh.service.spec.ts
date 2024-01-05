import { TestBed } from '@angular/core/testing';

import { DuyetHoanThanhService } from './duyet-hoan-thanh.service';

describe('DuyetHoanThanhService', () => {
  let service: DuyetHoanThanhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuyetHoanThanhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
