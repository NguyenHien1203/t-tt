import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LichTinhUyComponent } from './lich-tinh-uy.component';

describe('LichTinhUyComponent', () => {
  let component: LichTinhUyComponent;
  let fixture: ComponentFixture<LichTinhUyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LichTinhUyComponent]
    });
    fixture = TestBed.createComponent(LichTinhUyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
