import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhanPhoiComponent } from './phan-phoi.component';

describe('PhanPhoiComponent', () => {
  let component: PhanPhoiComponent;
  let fixture: ComponentFixture<PhanPhoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhanPhoiComponent]
    });
    fixture = TestBed.createComponent(PhanPhoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
