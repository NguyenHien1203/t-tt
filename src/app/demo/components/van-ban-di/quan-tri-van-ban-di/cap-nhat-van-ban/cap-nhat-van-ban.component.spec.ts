import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatVanBanComponent } from './cap-nhat-van-ban.component';

describe('CapNhatVanBanComponent', () => {
  let component: CapNhatVanBanComponent;
  let fixture: ComponentFixture<CapNhatVanBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapNhatVanBanComponent]
    });
    fixture = TestBed.createComponent(CapNhatVanBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
