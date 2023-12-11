import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoatDongSapToiComponent } from './hoat-dong-sap-toi.component';

describe('HoatDongSapToiComponent', () => {
  let component: HoatDongSapToiComponent;
  let fixture: ComponentFixture<HoatDongSapToiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoatDongSapToiComponent]
    });
    fixture = TestBed.createComponent(HoatDongSapToiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
