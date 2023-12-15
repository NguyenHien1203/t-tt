import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanBanPhaiBaoCaoComponent } from './van-ban-phai-bao-cao.component';

describe('VanBanPhaiBaoCaoComponent', () => {
  let component: VanBanPhaiBaoCaoComponent;
  let fixture: ComponentFixture<VanBanPhaiBaoCaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VanBanPhaiBaoCaoComponent]
    });
    fixture = TestBed.createComponent(VanBanPhaiBaoCaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
