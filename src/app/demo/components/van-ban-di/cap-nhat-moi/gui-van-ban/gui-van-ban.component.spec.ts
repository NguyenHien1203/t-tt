import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiVanBanComponent } from './gui-van-ban.component';

describe('GuiVanBanComponent', () => {
  let component: GuiVanBanComponent;
  let fixture: ComponentFixture<GuiVanBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuiVanBanComponent]
    });
    fixture = TestBed.createComponent(GuiVanBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
