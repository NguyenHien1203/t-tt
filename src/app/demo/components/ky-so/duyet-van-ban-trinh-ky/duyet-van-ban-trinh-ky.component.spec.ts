import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuyetVanBanTrinhKyComponent } from './duyet-van-ban-trinh-ky.component';

describe('DuyetVanBanTrinhKyComponent', () => {
  let component: DuyetVanBanTrinhKyComponent;
  let fixture: ComponentFixture<DuyetVanBanTrinhKyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuyetVanBanTrinhKyComponent]
    });
    fixture = TestBed.createComponent(DuyetVanBanTrinhKyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
