import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuongXuLyComponent } from './luong-xu-ly.component';

describe('LuongXuLyComponent', () => {
  let component: LuongXuLyComponent;
  let fixture: ComponentFixture<LuongXuLyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LuongXuLyComponent]
    });
    fixture = TestBed.createComponent(LuongXuLyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
