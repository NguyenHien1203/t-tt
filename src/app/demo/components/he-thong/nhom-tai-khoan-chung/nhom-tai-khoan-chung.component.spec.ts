import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomTaiKhoanChungComponent } from './nhom-tai-khoan-chung.component';

describe('NhomTaiKhoanChungComponent', () => {
  let component: NhomTaiKhoanChungComponent;
  let fixture: ComponentFixture<NhomTaiKhoanChungComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhomTaiKhoanChungComponent]
    });
    fixture = TestBed.createComponent(NhomTaiKhoanChungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
