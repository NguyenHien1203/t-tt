import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DapAnComponent } from './dap-an.component';

describe('DapAnComponent', () => {
  let component: DapAnComponent;
  let fixture: ComponentFixture<DapAnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DapAnComponent]
    });
    fixture = TestBed.createComponent(DapAnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
