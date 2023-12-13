import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuongKySoComponent } from './luong-ky-so.component';

describe('LuongKySoComponent', () => {
  let component: LuongKySoComponent;
  let fixture: ComponentFixture<LuongKySoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LuongKySoComponent]
    });
    fixture = TestBed.createComponent(LuongKySoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
