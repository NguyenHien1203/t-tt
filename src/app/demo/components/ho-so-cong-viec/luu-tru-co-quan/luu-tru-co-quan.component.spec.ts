import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuuTruCoQuanComponent } from './luu-tru-co-quan.component';

describe('LuuTruCoQuanComponent', () => {
  let component: LuuTruCoQuanComponent;
  let fixture: ComponentFixture<LuuTruCoQuanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LuuTruCoQuanComponent]
    });
    fixture = TestBed.createComponent(LuuTruCoQuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
