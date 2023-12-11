import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimKiemTheoSoVanBanComponent } from './tim-kiem-theo-so-van-ban.component';

describe('TimKiemTheoSoVanBanComponent', () => {
  let component: TimKiemTheoSoVanBanComponent;
  let fixture: ComponentFixture<TimKiemTheoSoVanBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimKiemTheoSoVanBanComponent]
    });
    fixture = TestBed.createComponent(TimKiemTheoSoVanBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
