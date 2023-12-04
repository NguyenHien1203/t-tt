import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyChuyenMucCauHoiComponent } from './quan-ly-chuyen-muc-cau-hoi.component';

describe('QuanLyChuyenMucCauHoiComponent', () => {
  let component: QuanLyChuyenMucCauHoiComponent;
  let fixture: ComponentFixture<QuanLyChuyenMucCauHoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanLyChuyenMucCauHoiComponent]
    });
    fixture = TestBed.createComponent(QuanLyChuyenMucCauHoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
