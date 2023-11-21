import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanBanNghiepVuComponent } from './van-ban-nghiep-vu.component';

describe('VanBanNghiepVuComponent', () => {
  let component: VanBanNghiepVuComponent;
  let fixture: ComponentFixture<VanBanNghiepVuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VanBanNghiepVuComponent]
    });
    fixture = TestBed.createComponent(VanBanNghiepVuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
