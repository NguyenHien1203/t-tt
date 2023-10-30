import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhongBanComponent } from './phong-ban.component';

describe('PhongBanComponent', () => {
  let component: PhongBanComponent;
  let fixture: ComponentFixture<PhongBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhongBanComponent]
    });
    fixture = TestBed.createComponent(PhongBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
