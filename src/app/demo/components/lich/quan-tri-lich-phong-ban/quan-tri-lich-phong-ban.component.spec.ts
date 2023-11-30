import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanTriLichPhongBanComponent } from './quan-tri-lich-phong-ban.component';

describe('QuanTriLichPhongBanComponent', () => {
  let component: QuanTriLichPhongBanComponent;
  let fixture: ComponentFixture<QuanTriLichPhongBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanTriLichPhongBanComponent]
    });
    fixture = TestBed.createComponent(QuanTriLichPhongBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
