import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuyetHoanThanhComponent } from './duyet-hoan-thanh.component';

describe('DuyetHoanThanhComponent', () => {
  let component: DuyetHoanThanhComponent;
  let fixture: ComponentFixture<DuyetHoanThanhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuyetHoanThanhComponent]
    });
    fixture = TestBed.createComponent(DuyetHoanThanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
