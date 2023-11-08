import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatDonViComponent } from './cap-nhat-don-vi.component';

describe('CapNhatDonViComponent', () => {
  let component: CapNhatDonViComponent;
  let fixture: ComponentFixture<CapNhatDonViComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapNhatDonViComponent]
    });
    fixture = TestBed.createComponent(CapNhatDonViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
