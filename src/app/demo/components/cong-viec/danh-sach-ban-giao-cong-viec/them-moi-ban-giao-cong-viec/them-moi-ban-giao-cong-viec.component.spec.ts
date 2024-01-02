import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemMoiBanGiaoCongViecComponent } from './them-moi-ban-giao-cong-viec.component';

describe('ThemMoiBanGiaoCongViecComponent', () => {
  let component: ThemMoiBanGiaoCongViecComponent;
  let fixture: ComponentFixture<ThemMoiBanGiaoCongViecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemMoiBanGiaoCongViecComponent]
    });
    fixture = TestBed.createComponent(ThemMoiBanGiaoCongViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
