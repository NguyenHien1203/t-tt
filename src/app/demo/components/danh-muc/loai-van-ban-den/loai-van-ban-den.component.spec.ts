import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiVanBanDenComponent } from './loai-van-ban-den.component';

describe('LoaiVanBanDenComponent', () => {
  let component: LoaiVanBanDenComponent;
  let fixture: ComponentFixture<LoaiVanBanDenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaiVanBanDenComponent]
    });
    fixture = TestBed.createComponent(LoaiVanBanDenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
