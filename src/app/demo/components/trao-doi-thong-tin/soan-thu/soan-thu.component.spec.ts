import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoanThuComponent } from './soan-thu.component';

describe('SoanThuComponent', () => {
  let component: SoanThuComponent;
  let fixture: ComponentFixture<SoanThuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoanThuComponent]
    });
    fixture = TestBed.createComponent(SoanThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
