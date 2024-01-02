import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanBanDaTuChoiComponent } from './van-ban-da-tu-choi.component';

describe('VanBanDaTuChoiComponent', () => {
  let component: VanBanDaTuChoiComponent;
  let fixture: ComponentFixture<VanBanDaTuChoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VanBanDaTuChoiComponent]
    });
    fixture = TestBed.createComponent(VanBanDaTuChoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
