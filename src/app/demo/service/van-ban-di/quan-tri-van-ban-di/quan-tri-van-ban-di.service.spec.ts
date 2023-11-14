import { TestBed } from '@angular/core/testing';

import { QuanTriVanBanDiService } from './quan-tri-van-ban-di.service';

describe('QuanTriVanBanDiService', () => {
  let service: QuanTriVanBanDiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanTriVanBanDiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
