import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomTaiKhoanCaNhanComponent } from './nhom-tai-khoan-ca-nhan.component';

describe('NhomTaiKhoanCaNhanComponent', () => {
  let component: NhomTaiKhoanCaNhanComponent;
  let fixture: ComponentFixture<NhomTaiKhoanCaNhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhomTaiKhoanCaNhanComponent]
    });
    fixture = TestBed.createComponent(NhomTaiKhoanCaNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
