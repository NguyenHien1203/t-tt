import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LichUbndTinhComponent } from './lich-ubnd-tinh.component';

describe('LichUbndTinhComponent', () => {
  let component: LichUbndTinhComponent;
  let fixture: ComponentFixture<LichUbndTinhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LichUbndTinhComponent]
    });
    fixture = TestBed.createComponent(LichUbndTinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
