import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BieuDoThongKeTheoTieuChiComponent } from './bieu-do-thong-ke-theo-tieu-chi.component';

describe('BieuDoThongKeTheoTieuChiComponent', () => {
  let component: BieuDoThongKeTheoTieuChiComponent;
  let fixture: ComponentFixture<BieuDoThongKeTheoTieuChiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BieuDoThongKeTheoTieuChiComponent]
    });
    fixture = TestBed.createComponent(BieuDoThongKeTheoTieuChiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
