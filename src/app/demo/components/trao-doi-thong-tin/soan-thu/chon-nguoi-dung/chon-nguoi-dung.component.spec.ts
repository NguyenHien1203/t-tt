import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonNguoiDungComponent } from './chon-nguoi-dung.component';

describe('ChonNguoiDungComponent', () => {
  let component: ChonNguoiDungComponent;
  let fixture: ComponentFixture<ChonNguoiDungComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChonNguoiDungComponent]
    });
    fixture = TestBed.createComponent(ChonNguoiDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
