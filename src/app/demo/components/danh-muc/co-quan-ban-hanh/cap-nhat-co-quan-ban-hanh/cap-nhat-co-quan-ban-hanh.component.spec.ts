import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatCoQuanBanHanhComponent } from './cap-nhat-co-quan-ban-hanh.component';

describe('CapNhatCoQuanBanHanhComponent', () => {
  let component: CapNhatCoQuanBanHanhComponent;
  let fixture: ComponentFixture<CapNhatCoQuanBanHanhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapNhatCoQuanBanHanhComponent]
    });
    fixture = TestBed.createComponent(CapNhatCoQuanBanHanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
