import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemDonViVaoNhomComponent } from './them-don-vi-vao-nhom.component';

describe('ThemDonViVaoNhomComponent', () => {
  let component: ThemDonViVaoNhomComponent;
  let fixture: ComponentFixture<ThemDonViVaoNhomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemDonViVaoNhomComponent]
    });
    fixture = TestBed.createComponent(ThemDonViVaoNhomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
