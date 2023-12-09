import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonCongViecComponent } from './chon-cong-viec.component';

describe('ChonCongViecComponent', () => {
  let component: ChonCongViecComponent;
  let fixture: ComponentFixture<ChonCongViecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChonCongViecComponent]
    });
    fixture = TestBed.createComponent(ChonCongViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
