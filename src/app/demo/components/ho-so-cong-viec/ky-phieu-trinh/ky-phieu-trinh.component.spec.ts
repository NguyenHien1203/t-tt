import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KyPhieuTrinhComponent } from './ky-phieu-trinh.component';

describe('KyPhieuTrinhComponent', () => {
  let component: KyPhieuTrinhComponent;
  let fixture: ComponentFixture<KyPhieuTrinhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KyPhieuTrinhComponent]
    });
    fixture = TestBed.createComponent(KyPhieuTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
