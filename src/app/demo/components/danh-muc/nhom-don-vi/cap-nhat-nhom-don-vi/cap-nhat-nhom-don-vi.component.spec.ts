import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatNhomDonViComponent } from './cap-nhat-nhom-don-vi.component';

describe('CapNhatNhomDonViComponent', () => {
  let component: CapNhatNhomDonViComponent;
  let fixture: ComponentFixture<CapNhatNhomDonViComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapNhatNhomDonViComponent]
    });
    fixture = TestBed.createComponent(CapNhatNhomDonViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
