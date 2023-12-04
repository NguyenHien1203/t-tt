import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraLoiComponent } from './tra-loi.component';

describe('TraLoiComponent', () => {
  let component: TraLoiComponent;
  let fixture: ComponentFixture<TraLoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraLoiComponent]
    });
    fixture = TestBed.createComponent(TraLoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
