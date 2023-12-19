import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatVanBanDaGuiComponent } from './cap-nhat-van-ban-da-gui.component';

describe('CapNhatVanBanDaGuiComponent', () => {
  let component: CapNhatVanBanDaGuiComponent;
  let fixture: ComponentFixture<CapNhatVanBanDaGuiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapNhatVanBanDaGuiComponent]
    });
    fixture = TestBed.createComponent(CapNhatVanBanDaGuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
