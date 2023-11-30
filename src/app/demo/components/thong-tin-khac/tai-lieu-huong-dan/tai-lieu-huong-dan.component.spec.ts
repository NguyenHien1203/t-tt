import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaiLieuHuongDanComponent } from './tai-lieu-huong-dan.component';

describe('TaiLieuHuongDanComponent', () => {
  let component: TaiLieuHuongDanComponent;
  let fixture: ComponentFixture<TaiLieuHuongDanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaiLieuHuongDanComponent]
    });
    fixture = TestBed.createComponent(TaiLieuHuongDanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
