import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinhChatNhiemVuComponent } from './tinh-chat-nhiem-vu.component';

describe('TinhChatNhiemVuComponent', () => {
  let component: TinhChatNhiemVuComponent;
  let fixture: ComponentFixture<TinhChatNhiemVuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TinhChatNhiemVuComponent]
    });
    fixture = TestBed.createComponent(TinhChatNhiemVuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
