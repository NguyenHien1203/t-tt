import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LichHdndVaDbqhComponent } from './lich-hdnd-va-dbqh.component';

describe('LichHdndVaDbqhComponent', () => {
  let component: LichHdndVaDbqhComponent;
  let fixture: ComponentFixture<LichHdndVaDbqhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LichHdndVaDbqhComponent]
    });
    fixture = TestBed.createComponent(LichHdndVaDbqhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
