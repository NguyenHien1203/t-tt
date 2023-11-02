import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatPhongBanComponent } from './cap-nhat-phong-ban.component';

describe('CapNhatPhongBanComponent', () => {
  let component: CapNhatPhongBanComponent;
  let fixture: ComponentFixture<CapNhatPhongBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapNhatPhongBanComponent]
    });
    fixture = TestBed.createComponent(CapNhatPhongBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
