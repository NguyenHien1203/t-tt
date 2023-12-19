import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyDatLaiMatKhauComponent } from './quan-ly-dat-lai-mat-khau.component';

describe('QuanLyDatLaiMatKhauComponent', () => {
  let component: QuanLyDatLaiMatKhauComponent;
  let fixture: ComponentFixture<QuanLyDatLaiMatKhauComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanLyDatLaiMatKhauComponent]
    });
    fixture = TestBed.createComponent(QuanLyDatLaiMatKhauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
