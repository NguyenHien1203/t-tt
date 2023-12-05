import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucHoSoCaNhanComponent } from './danh-muc-ho-so-ca-nhan.component';

describe('DanhMucHoSoCaNhanComponent', () => {
  let component: DanhMucHoSoCaNhanComponent;
  let fixture: ComponentFixture<DanhMucHoSoCaNhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DanhMucHoSoCaNhanComponent]
    });
    fixture = TestBed.createComponent(DanhMucHoSoCaNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
