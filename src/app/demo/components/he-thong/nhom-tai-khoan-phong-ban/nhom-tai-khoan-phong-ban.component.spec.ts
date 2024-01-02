import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomTaiKhoanPhongBanComponent } from './nhom-tai-khoan-phong-ban.component';

describe('NhomTaiKhoanPhongBanComponent', () => {
  let component: NhomTaiKhoanPhongBanComponent;
  let fixture: ComponentFixture<NhomTaiKhoanPhongBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhomTaiKhoanPhongBanComponent]
    });
    fixture = TestBed.createComponent(NhomTaiKhoanPhongBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
