import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietComponent } from './chi-tiet.component';

describe('ChiTietComponent', () => {
  let component: ChiTietComponent;
  let fixture: ComponentFixture<ChiTietComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietComponent]
    });
    fixture = TestBed.createComponent(ChiTietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
