import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietVanBanComponent } from './chi-tiet-van-ban.component';

describe('ChiTietVanBanComponent', () => {
  let component: ChiTietVanBanComponent;
  let fixture: ComponentFixture<ChiTietVanBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietVanBanComponent]
    });
    fixture = TestBed.createComponent(ChiTietVanBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
