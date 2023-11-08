import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyBangLuongComponent } from './quan-ly-bang-luong.component';

describe('QuanLyBangLuongComponent', () => {
  let component: QuanLyBangLuongComponent;
  let fixture: ComponentFixture<QuanLyBangLuongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanLyBangLuongComponent]
    });
    fixture = TestBed.createComponent(QuanLyBangLuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
