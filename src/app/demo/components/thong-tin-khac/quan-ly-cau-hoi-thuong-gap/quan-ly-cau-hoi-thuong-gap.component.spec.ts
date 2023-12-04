import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyCauHoiThuongGapComponent } from './quan-ly-cau-hoi-thuong-gap.component';

describe('QuanLyCauHoiThuongGapComponent', () => {
  let component: QuanLyCauHoiThuongGapComponent;
  let fixture: ComponentFixture<QuanLyCauHoiThuongGapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanLyCauHoiThuongGapComponent]
    });
    fixture = TestBed.createComponent(QuanLyCauHoiThuongGapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
