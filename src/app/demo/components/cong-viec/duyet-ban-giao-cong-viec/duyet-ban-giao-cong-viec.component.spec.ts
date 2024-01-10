import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuyetBanGiaoCongViecComponent } from './duyet-ban-giao-cong-viec.component';

describe('DuyetBanGiaoCongViecComponent', () => {
  let component: DuyetBanGiaoCongViecComponent;
  let fixture: ComponentFixture<DuyetBanGiaoCongViecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuyetBanGiaoCongViecComponent]
    });
    fixture = TestBed.createComponent(DuyetBanGiaoCongViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
