import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CauHoiThuongGapComponent } from './cau-hoi-thuong-gap.component';

describe('CauHoiThuongGapComponent', () => {
  let component: CauHoiThuongGapComponent;
  let fixture: ComponentFixture<CauHoiThuongGapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CauHoiThuongGapComponent]
    });
    fixture = TestBed.createComponent(CauHoiThuongGapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
