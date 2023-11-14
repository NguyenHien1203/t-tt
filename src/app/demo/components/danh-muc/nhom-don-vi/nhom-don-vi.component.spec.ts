import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomDonViComponent } from './nhom-don-vi.component';

describe('NhomDonViComponent', () => {
  let component: NhomDonViComponent;
  let fixture: ComponentFixture<NhomDonViComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhomDonViComponent]
    });
    fixture = TestBed.createComponent(NhomDonViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
