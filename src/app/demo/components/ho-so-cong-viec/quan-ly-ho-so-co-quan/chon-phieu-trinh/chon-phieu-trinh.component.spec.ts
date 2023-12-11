import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonPhieuTrinhComponent } from './chon-phieu-trinh.component';

describe('ChonPhieuTrinhComponent', () => {
  let component: ChonPhieuTrinhComponent;
  let fixture: ComponentFixture<ChonPhieuTrinhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChonPhieuTrinhComponent]
    });
    fixture = TestBed.createComponent(ChonPhieuTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
