import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyThongBaoComponent } from './quan-ly-thong-bao.component';

describe('QuanLyThongBaoComponent', () => {
  let component: QuanLyThongBaoComponent;
  let fixture: ComponentFixture<QuanLyThongBaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanLyThongBaoComponent]
    });
    fixture = TestBed.createComponent(QuanLyThongBaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
