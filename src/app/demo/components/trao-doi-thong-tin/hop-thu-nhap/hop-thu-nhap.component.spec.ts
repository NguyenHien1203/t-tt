import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopThuNhapComponent } from './hop-thu-nhap.component';

describe('HopThuNhapComponent', () => {
  let component: HopThuNhapComponent;
  let fixture: ComponentFixture<HopThuNhapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HopThuNhapComponent]
    });
    fixture = TestBed.createComponent(HopThuNhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
