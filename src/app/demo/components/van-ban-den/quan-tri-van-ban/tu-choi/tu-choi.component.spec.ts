import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuChoiComponent } from './tu-choi.component';

describe('TuChoiComponent', () => {
  let component: TuChoiComponent;
  let fixture: ComponentFixture<TuChoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TuChoiComponent]
    });
    fixture = TestBed.createComponent(TuChoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
