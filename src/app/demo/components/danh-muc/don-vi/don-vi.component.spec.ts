import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonViComponent } from './don-vi.component';

describe('DonViComponent', () => {
  let component: DonViComponent;
  let fixture: ComponentFixture<DonViComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonViComponent]
    });
    fixture = TestBed.createComponent(DonViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
