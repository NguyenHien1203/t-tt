import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraCuuNangCaoComponent } from './tra-cuu-nang-cao.component';

describe('TraCuuNangCaoComponent', () => {
  let component: TraCuuNangCaoComponent;
  let fixture: ComponentFixture<TraCuuNangCaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraCuuNangCaoComponent]
    });
    fixture = TestBed.createComponent(TraCuuNangCaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
