import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachBanGiaoCongViecComponent } from './danh-sach-ban-giao-cong-viec.component';

describe('DanhSachBanGiaoCongViecComponent', () => {
  let component: DanhSachBanGiaoCongViecComponent;
  let fixture: ComponentFixture<DanhSachBanGiaoCongViecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DanhSachBanGiaoCongViecComponent]
    });
    fixture = TestBed.createComponent(DanhSachBanGiaoCongViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
