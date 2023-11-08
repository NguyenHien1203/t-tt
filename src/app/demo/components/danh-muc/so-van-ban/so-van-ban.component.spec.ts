import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoVanBanComponent } from './so-van-ban.component';

describe('SoVanBanComponent', () => {
  let component: SoVanBanComponent;
  let fixture: ComponentFixture<SoVanBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoVanBanComponent]
    });
    fixture = TestBed.createComponent(SoVanBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
