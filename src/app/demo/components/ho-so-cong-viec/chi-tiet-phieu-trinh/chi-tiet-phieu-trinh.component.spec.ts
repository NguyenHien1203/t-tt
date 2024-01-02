import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietPhieuTrinhComponent } from './chi-tiet-phieu-trinh.component';

describe('ChiTietPhieuTrinhComponent', () => {
  let component: ChiTietPhieuTrinhComponent;
  let fixture: ComponentFixture<ChiTietPhieuTrinhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietPhieuTrinhComponent]
    });
    fixture = TestBed.createComponent(ChiTietPhieuTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
