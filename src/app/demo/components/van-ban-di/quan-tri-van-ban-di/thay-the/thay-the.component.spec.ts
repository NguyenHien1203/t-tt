import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThayTheComponent } from './thay-the.component';

describe('ThayTheComponent', () => {
  let component: ThayTheComponent;
  let fixture: ComponentFixture<ThayTheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThayTheComponent]
    });
    fixture = TestBed.createComponent(ThayTheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
