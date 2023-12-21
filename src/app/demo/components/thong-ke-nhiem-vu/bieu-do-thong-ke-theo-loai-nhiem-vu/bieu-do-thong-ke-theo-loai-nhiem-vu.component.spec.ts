import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BieuDoThongKeTheoLoaiNhiemVuComponent } from './bieu-do-thong-ke-theo-loai-nhiem-vu.component';

describe('BieuDoThongKeTheoLoaiNhiemVuComponent', () => {
  let component: BieuDoThongKeTheoLoaiNhiemVuComponent;
  let fixture: ComponentFixture<BieuDoThongKeTheoLoaiNhiemVuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BieuDoThongKeTheoLoaiNhiemVuComponent]
    });
    fixture = TestBed.createComponent(BieuDoThongKeTheoLoaiNhiemVuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
