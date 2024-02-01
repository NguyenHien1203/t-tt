import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachDeXuatCongViecComponent } from './danh-sach-de-xuat-cong-viec.component';

describe('DanhSachDeXuatCongViecComponent', () => {
  let component: DanhSachDeXuatCongViecComponent;
  let fixture: ComponentFixture<DanhSachDeXuatCongViecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DanhSachDeXuatCongViecComponent]
    });
    fixture = TestBed.createComponent(DanhSachDeXuatCongViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
