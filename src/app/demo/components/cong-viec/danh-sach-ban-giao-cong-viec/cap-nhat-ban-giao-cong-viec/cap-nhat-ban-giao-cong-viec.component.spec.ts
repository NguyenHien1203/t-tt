import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatBanGiaoCongViecComponent } from './cap-nhat-ban-giao-cong-viec.component';

describe('CapNhatBanGiaoCongViecComponent', () => {
  let component: CapNhatBanGiaoCongViecComponent;
  let fixture: ComponentFixture<CapNhatBanGiaoCongViecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapNhatBanGiaoCongViecComponent]
    });
    fixture = TestBed.createComponent(CapNhatBanGiaoCongViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
