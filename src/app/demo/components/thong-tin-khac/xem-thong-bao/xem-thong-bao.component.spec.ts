import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XemThongBaoComponent } from './xem-thong-bao.component';

describe('XemThongBaoComponent', () => {
  let component: XemThongBaoComponent;
  let fixture: ComponentFixture<XemThongBaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XemThongBaoComponent]
    });
    fixture = TestBed.createComponent(XemThongBaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
