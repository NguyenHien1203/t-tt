import { TestBed } from '@angular/core/testing';

import { TinhChatNhiemVuService } from './tinh-chat-nhiem-vu.service';

describe('TinhChatNhiemVuService', () => {
  let service: TinhChatNhiemVuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TinhChatNhiemVuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
