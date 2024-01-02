import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrinhKyVanBanComponent } from './trinh-ky-van-ban.component';

describe('TrinhKyVanBanComponent', () => {
  let component: TrinhKyVanBanComponent;
  let fixture: ComponentFixture<TrinhKyVanBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrinhKyVanBanComponent]
    });
    fixture = TestBed.createComponent(TrinhKyVanBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
