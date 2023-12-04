import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LichCoQuanComponent } from './lich-co-quan.component';

describe('LichCoQuanComponent', () => {
  let component: LichCoQuanComponent;
  let fixture: ComponentFixture<LichCoQuanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LichCoQuanComponent]
    });
    fixture = TestBed.createComponent(LichCoQuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
