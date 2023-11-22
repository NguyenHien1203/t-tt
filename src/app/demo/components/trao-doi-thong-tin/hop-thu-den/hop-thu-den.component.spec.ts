import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopThuDenComponent } from './hop-thu-den.component';

describe('HopThuDenComponent', () => {
  let component: HopThuDenComponent;
  let fixture: ComponentFixture<HopThuDenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HopThuDenComponent]
    });
    fixture = TestBed.createComponent(HopThuDenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
