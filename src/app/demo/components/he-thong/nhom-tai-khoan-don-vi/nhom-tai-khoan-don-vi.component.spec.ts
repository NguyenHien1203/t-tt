import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomTaiKhoanDonViComponent } from './nhom-tai-khoan-don-vi.component';

describe('NhomTaiKhoanDonViComponent', () => {
  let component: NhomTaiKhoanDonViComponent;
  let fixture: ComponentFixture<NhomTaiKhoanDonViComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhomTaiKhoanDonViComponent]
    });
    fixture = TestBed.createComponent(NhomTaiKhoanDonViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
