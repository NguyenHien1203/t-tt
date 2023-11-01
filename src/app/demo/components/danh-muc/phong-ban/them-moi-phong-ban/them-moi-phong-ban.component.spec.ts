import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemMoiPhongBanComponent } from './them-moi-phong-ban.component';

describe('ThemMoiPhongBanComponent', () => {
  let component: ThemMoiPhongBanComponent;
  let fixture: ComponentFixture<ThemMoiPhongBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemMoiPhongBanComponent]
    });
    fixture = TestBed.createComponent(ThemMoiPhongBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
