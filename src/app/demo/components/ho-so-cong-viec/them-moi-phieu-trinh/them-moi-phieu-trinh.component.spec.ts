import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemMoiPhieuTrinhComponent } from './them-moi-phieu-trinh.component';

describe('ThemMoiPhieuTrinhComponent', () => {
  let component: ThemMoiPhieuTrinhComponent;
  let fixture: ComponentFixture<ThemMoiPhieuTrinhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemMoiPhieuTrinhComponent]
    });
    fixture = TestBed.createComponent(ThemMoiPhieuTrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
