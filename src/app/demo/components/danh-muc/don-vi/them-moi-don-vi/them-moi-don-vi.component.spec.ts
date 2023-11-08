import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemMoiDonViComponent } from './them-moi-don-vi.component';

describe('ThemMoiDonViComponent', () => {
  let component: ThemMoiDonViComponent;
  let fixture: ComponentFixture<ThemMoiDonViComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemMoiDonViComponent]
    });
    fixture = TestBed.createComponent(ThemMoiDonViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
