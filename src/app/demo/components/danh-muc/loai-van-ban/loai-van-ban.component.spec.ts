import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiVanBanComponent } from './loai-van-ban.component';

describe('LoaiVanBanComponent', () => {
  let component: LoaiVanBanComponent;
  let fixture: ComponentFixture<LoaiVanBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaiVanBanComponent]
    });
    fixture = TestBed.createComponent(LoaiVanBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
