import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietTraoDoiComponent } from './chi-tiet-trao-doi.component';

describe('ChiTietTraoDoiComponent', () => {
  let component: ChiTietTraoDoiComponent;
  let fixture: ComponentFixture<ChiTietTraoDoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiTietTraoDoiComponent]
    });
    fixture = TestBed.createComponent(ChiTietTraoDoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
