import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietNhomTaiKhoanComponent } from './chi-tiet-nhom-tai-khoan.component';

describe('ChiTietNhomTaiKhoanComponent', () => {
  let component: ChiTietNhomTaiKhoanComponent;
  let fixture: ComponentFixture<ChiTietNhomTaiKhoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietNhomTaiKhoanComponent]
    });
    fixture = TestBed.createComponent(ChiTietNhomTaiKhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
