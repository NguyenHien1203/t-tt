import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XemBangLuongComponent } from './xem-bang-luong.component';

describe('XemBangLuongComponent', () => {
  let component: XemBangLuongComponent;
  let fixture: ComponentFixture<XemBangLuongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XemBangLuongComponent]
    });
    fixture = TestBed.createComponent(XemBangLuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
