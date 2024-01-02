import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemMoiMocNhiemVuComponent } from './them-moi-moc-nhiem-vu.component';

describe('ThemMoiMocNhiemVuComponent', () => {
  let component: ThemMoiMocNhiemVuComponent;
  let fixture: ComponentFixture<ThemMoiMocNhiemVuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemMoiMocNhiemVuComponent]
    });
    fixture = TestBed.createComponent(ThemMoiMocNhiemVuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
