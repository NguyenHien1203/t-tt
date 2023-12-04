import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThamDoYKienComponent } from './tham-do-y-kien.component';

describe('ThamDoYKienComponent', () => {
  let component: ThamDoYKienComponent;
  let fixture: ComponentFixture<ThamDoYKienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThamDoYKienComponent]
    });
    fixture = TestBed.createComponent(ThamDoYKienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
