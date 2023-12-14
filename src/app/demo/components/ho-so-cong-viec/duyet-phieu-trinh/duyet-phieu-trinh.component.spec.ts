import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuyetPhieuTrinhComponent } from './duyet-phieu-trinh.component';

describe('DuyetPhieuTrinhComponent', () => {
  let component: DuyetPhieuTrinhComponent;
  let fixture: ComponentFixture<DuyetPhieuTrinhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuyetPhieuTrinhComponent]
    });
    fixture = TestBed.createComponent(DuyetPhieuTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
