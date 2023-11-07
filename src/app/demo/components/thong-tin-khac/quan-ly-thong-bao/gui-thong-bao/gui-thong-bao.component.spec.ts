import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiThongBaoComponent } from './gui-thong-bao.component';

describe('GuiThongBaoComponent', () => {
  let component: GuiThongBaoComponent;
  let fixture: ComponentFixture<GuiThongBaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuiThongBaoComponent]
    });
    fixture = TestBed.createComponent(GuiThongBaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
