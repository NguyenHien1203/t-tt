import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanBanChoPhatHanhComponent } from './van-ban-cho-phat-hanh.component';

describe('VanBanChoPhatHanhComponent', () => {
  let component: VanBanChoPhatHanhComponent;
  let fixture: ComponentFixture<VanBanChoPhatHanhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VanBanChoPhatHanhComponent]
    });
    fixture = TestBed.createComponent(VanBanChoPhatHanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
