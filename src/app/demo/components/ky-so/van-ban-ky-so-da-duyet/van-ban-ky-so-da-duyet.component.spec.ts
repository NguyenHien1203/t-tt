import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanBanKySoDaDuyetComponent } from './van-ban-ky-so-da-duyet.component';

describe('VanBanKySoDaDuyetComponent', () => {
  let component: VanBanKySoDaDuyetComponent;
  let fixture: ComponentFixture<VanBanKySoDaDuyetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VanBanKySoDaDuyetComponent]
    });
    fixture = TestBed.createComponent(VanBanKySoDaDuyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
