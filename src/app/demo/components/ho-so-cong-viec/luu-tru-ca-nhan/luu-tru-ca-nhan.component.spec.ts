import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuuTruCaNhanComponent } from './luu-tru-ca-nhan.component';

describe('LuuTruCaNhanComponent', () => {
  let component: LuuTruCaNhanComponent;
  let fixture: ComponentFixture<LuuTruCaNhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LuuTruCaNhanComponent]
    });
    fixture = TestBed.createComponent(LuuTruCaNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
