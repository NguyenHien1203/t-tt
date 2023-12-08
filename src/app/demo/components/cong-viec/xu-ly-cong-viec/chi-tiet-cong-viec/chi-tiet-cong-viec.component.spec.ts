import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietCongViecComponent } from './chi-tiet-cong-viec.component';

describe('ChiTietCongViecComponent', () => {
  let component: ChiTietCongViecComponent;
  let fixture: ComponentFixture<ChiTietCongViecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietCongViecComponent]
    });
    fixture = TestBed.createComponent(ChiTietCongViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
