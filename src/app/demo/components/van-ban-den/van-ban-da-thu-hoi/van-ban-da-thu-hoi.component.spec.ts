import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanBanDaThuHoiComponent } from './van-ban-da-thu-hoi.component';

describe('VanBanDaThuHoiComponent', () => {
  let component: VanBanDaThuHoiComponent;
  let fixture: ComponentFixture<VanBanDaThuHoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VanBanDaThuHoiComponent]
    });
    fixture = TestBed.createComponent(VanBanDaThuHoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
