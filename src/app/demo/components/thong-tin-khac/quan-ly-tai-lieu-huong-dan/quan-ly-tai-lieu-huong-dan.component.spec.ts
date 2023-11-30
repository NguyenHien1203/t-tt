import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyTaiLieuHuongDanComponent } from './quan-ly-tai-lieu-huong-dan.component';

describe('QuanLyTaiLieuHuongDanComponent', () => {
  let component: QuanLyTaiLieuHuongDanComponent;
  let fixture: ComponentFixture<QuanLyTaiLieuHuongDanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanLyTaiLieuHuongDanComponent]
    });
    fixture = TestBed.createComponent(QuanLyTaiLieuHuongDanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
