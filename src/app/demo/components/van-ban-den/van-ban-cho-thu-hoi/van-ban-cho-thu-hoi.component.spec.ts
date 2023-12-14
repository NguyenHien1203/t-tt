import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanBanChoThuHoiComponent } from './van-ban-cho-thu-hoi.component';

describe('VanBanChoThuHoiComponent', () => {
  let component: VanBanChoThuHoiComponent;
  let fixture: ComponentFixture<VanBanChoThuHoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VanBanChoThuHoiComponent]
    });
    fixture = TestBed.createComponent(VanBanChoThuHoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
