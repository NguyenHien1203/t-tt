import { TestBed } from '@angular/core/testing';

import { PhongBanService } from './phong-ban.service';

describe('PhongBanService', () => {
  let service: PhongBanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhongBanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
