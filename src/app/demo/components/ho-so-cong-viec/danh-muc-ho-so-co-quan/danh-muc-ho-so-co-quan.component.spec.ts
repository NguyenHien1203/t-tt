import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucHoSoCoQuanComponent } from './danh-muc-ho-so-co-quan.component';

describe('DanhMucHoSoCoQuanComponent', () => {
  let component: DanhMucHoSoCoQuanComponent;
  let fixture: ComponentFixture<DanhMucHoSoCoQuanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DanhMucHoSoCoQuanComponent]
    });
    fixture = TestBed.createComponent(DanhMucHoSoCoQuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
