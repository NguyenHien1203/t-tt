import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanTriLichComponent } from './quan-tri-lich.component';

describe('QuanTriLichComponent', () => {
  let component: QuanTriLichComponent;
  let fixture: ComponentFixture<QuanTriLichComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanTriLichComponent]
    });
    fixture = TestBed.createComponent(QuanTriLichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
