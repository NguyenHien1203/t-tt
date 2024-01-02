import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanBanKySoDaKyComponent } from './van-ban-ky-so-da-ky.component';

describe('VanBanKySoDaKyComponent', () => {
  let component: VanBanKySoDaKyComponent;
  let fixture: ComponentFixture<VanBanKySoDaKyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VanBanKySoDaKyComponent]
    });
    fixture = TestBed.createComponent(VanBanKySoDaKyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
