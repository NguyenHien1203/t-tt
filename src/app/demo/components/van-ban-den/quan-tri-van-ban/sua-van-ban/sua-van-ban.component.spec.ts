import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaVanBanComponent } from './sua-van-ban.component';

describe('SuaVanBanComponent', () => {
  let component: SuaVanBanComponent;
  let fixture: ComponentFixture<SuaVanBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuaVanBanComponent]
    });
    fixture = TestBed.createComponent(SuaVanBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
