import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoVanBanDiComponent } from './so-van-ban-di.component';

describe('SoVanBanDiComponent', () => {
  let component: SoVanBanDiComponent;
  let fixture: ComponentFixture<SoVanBanDiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoVanBanDiComponent]
    });
    fixture = TestBed.createComponent(SoVanBanDiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
