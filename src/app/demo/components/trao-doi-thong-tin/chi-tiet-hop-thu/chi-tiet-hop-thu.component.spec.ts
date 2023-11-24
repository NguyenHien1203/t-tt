import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietHopThuComponent } from './chi-tiet-hop-thu.component';

describe('ChiTietHopThuComponent', () => {
  let component: ChiTietHopThuComponent;
  let fixture: ComponentFixture<ChiTietHopThuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietHopThuComponent]
    });
    fixture = TestBed.createComponent(ChiTietHopThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
