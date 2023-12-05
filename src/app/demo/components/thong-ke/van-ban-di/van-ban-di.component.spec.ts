import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanBanDiComponent } from './van-ban-di.component';

describe('VanBanDiComponent', () => {
  let component: VanBanDiComponent;
  let fixture: ComponentFixture<VanBanDiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VanBanDiComponent]
    });
    fixture = TestBed.createComponent(VanBanDiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
