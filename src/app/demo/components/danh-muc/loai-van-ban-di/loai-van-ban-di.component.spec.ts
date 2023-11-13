import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiVanBanDiComponent } from './loai-van-ban-di.component';

describe('LoaiVanBanDiComponent', () => {
  let component: LoaiVanBanDiComponent;
  let fixture: ComponentFixture<LoaiVanBanDiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaiVanBanDiComponent]
    });
    fixture = TestBed.createComponent(LoaiVanBanDiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
