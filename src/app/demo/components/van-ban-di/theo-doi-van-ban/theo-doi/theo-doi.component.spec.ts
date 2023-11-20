import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheoDoiComponent } from './theo-doi.component';

describe('TheoDoiComponent', () => {
  let component: TheoDoiComponent;
  let fixture: ComponentFixture<TheoDoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TheoDoiComponent]
    });
    fixture = TestBed.createComponent(TheoDoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
