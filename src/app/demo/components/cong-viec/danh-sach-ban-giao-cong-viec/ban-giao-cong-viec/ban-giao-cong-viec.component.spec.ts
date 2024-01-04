import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanGiaoCongViecComponent } from './ban-giao-cong-viec.component';

describe('BanGiaoCongViecComponent', () => {
  let component: BanGiaoCongViecComponent;
  let fixture: ComponentFixture<BanGiaoCongViecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BanGiaoCongViecComponent]
    });
    fixture = TestBed.createComponent(BanGiaoCongViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
