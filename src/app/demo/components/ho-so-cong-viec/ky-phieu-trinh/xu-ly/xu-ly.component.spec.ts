import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XuLyComponent } from './xu-ly.component';

describe('XuLyComponent', () => {
  let component: XuLyComponent;
  let fixture: ComponentFixture<XuLyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XuLyComponent]
    });
    fixture = TestBed.createComponent(XuLyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
