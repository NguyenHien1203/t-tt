import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanBanNhanComponent } from './van-ban-nhan.component';

describe('VanBanNhanComponent', () => {
  let component: VanBanNhanComponent;
  let fixture: ComponentFixture<VanBanNhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VanBanNhanComponent]
    });
    fixture = TestBed.createComponent(VanBanNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
