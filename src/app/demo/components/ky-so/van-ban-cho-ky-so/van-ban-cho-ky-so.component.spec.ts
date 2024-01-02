import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanBanChoKySoComponent } from './van-ban-cho-ky-so.component';

describe('VanBanChoKySoComponent', () => {
  let component: VanBanChoKySoComponent;
  let fixture: ComponentFixture<VanBanChoKySoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VanBanChoKySoComponent]
    });
    fixture = TestBed.createComponent(VanBanChoKySoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
