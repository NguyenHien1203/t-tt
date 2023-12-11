import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraCuuDonGianComponent } from './tra-cuu-don-gian.component';

describe('TraCuuDonGianComponent', () => {
  let component: TraCuuDonGianComponent;
  let fixture: ComponentFixture<TraCuuDonGianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraCuuDonGianComponent]
    });
    fixture = TestBed.createComponent(TraCuuDonGianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
