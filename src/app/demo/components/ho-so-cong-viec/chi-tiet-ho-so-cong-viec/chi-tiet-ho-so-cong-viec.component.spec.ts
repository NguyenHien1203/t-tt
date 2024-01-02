import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietHoSoCongViecComponent } from './chi-tiet-ho-so-cong-viec.component';

describe('ChiTietHoSoCongViecComponent', () => {
  let component: ChiTietHoSoCongViecComponent;
  let fixture: ComponentFixture<ChiTietHoSoCongViecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietHoSoCongViecComponent]
    });
    fixture = TestBed.createComponent(ChiTietHoSoCongViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
