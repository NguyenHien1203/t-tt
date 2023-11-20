import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiCanhBaoComponent } from './gui-canh-bao.component';

describe('GuiCanhBaoComponent', () => {
  let component: GuiCanhBaoComponent;
  let fixture: ComponentFixture<GuiCanhBaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuiCanhBaoComponent]
    });
    fixture = TestBed.createComponent(GuiCanhBaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
