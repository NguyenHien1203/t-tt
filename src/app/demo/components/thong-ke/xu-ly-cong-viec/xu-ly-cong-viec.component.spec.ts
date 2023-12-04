import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XuLyCongViecComponent } from './xu-ly-cong-viec.component';

describe('XuLyCongViecComponent', () => {
  let component: XuLyCongViecComponent;
  let fixture: ComponentFixture<XuLyCongViecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XuLyCongViecComponent]
    });
    fixture = TestBed.createComponent(XuLyCongViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
