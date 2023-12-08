import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyHoSoCoQuanComponent } from './quan-ly-ho-so-co-quan.component';

describe('QuanLyHoSoCoQuanComponent', () => {
  let component: QuanLyHoSoCoQuanComponent;
  let fixture: ComponentFixture<QuanLyHoSoCoQuanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanLyHoSoCoQuanComponent]
    });
    fixture = TestBed.createComponent(QuanLyHoSoCoQuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
