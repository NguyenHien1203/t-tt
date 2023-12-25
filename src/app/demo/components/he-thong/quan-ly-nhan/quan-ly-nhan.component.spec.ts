import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyNhanComponent } from './quan-ly-nhan.component';

describe('QuanLyNhanComponent', () => {
  let component: QuanLyNhanComponent;
  let fixture: ComponentFixture<QuanLyNhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanLyNhanComponent]
    });
    fixture = TestBed.createComponent(QuanLyNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
