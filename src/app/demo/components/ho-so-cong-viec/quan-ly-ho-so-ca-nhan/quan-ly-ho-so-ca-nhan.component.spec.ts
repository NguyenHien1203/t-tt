import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyHoSoCaNhanComponent } from './quan-ly-ho-so-ca-nhan.component';

describe('QuanLyHoSoCaNhanComponent', () => {
  let component: QuanLyHoSoCaNhanComponent;
  let fixture: ComponentFixture<QuanLyHoSoCaNhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanLyHoSoCaNhanComponent]
    });
    fixture = TestBed.createComponent(QuanLyHoSoCaNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
