import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemMoiNhomDonViComponent } from './them-moi-nhom-don-vi.component';

describe('ThemMoiNhomDonViComponent', () => {
  let component: ThemMoiNhomDonViComponent;
  let fixture: ComponentFixture<ThemMoiNhomDonViComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemMoiNhomDonViComponent]
    });
    fixture = TestBed.createComponent(ThemMoiNhomDonViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
