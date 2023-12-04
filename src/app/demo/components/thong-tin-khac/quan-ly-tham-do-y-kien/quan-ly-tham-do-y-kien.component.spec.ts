import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyThamDoYKienComponent } from './quan-ly-tham-do-y-kien.component';

describe('QuanLyThamDoYKienComponent', () => {
  let component: QuanLyThamDoYKienComponent;
  let fixture: ComponentFixture<QuanLyThamDoYKienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanLyThamDoYKienComponent]
    });
    fixture = TestBed.createComponent(QuanLyThamDoYKienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
