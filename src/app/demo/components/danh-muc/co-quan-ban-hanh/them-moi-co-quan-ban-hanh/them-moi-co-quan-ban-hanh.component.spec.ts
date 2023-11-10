import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemMoiCoQuanBanHanhComponent } from './them-moi-co-quan-ban-hanh.component';

describe('ThemMoiCoQuanBanHanhComponent', () => {
  let component: ThemMoiCoQuanBanHanhComponent;
  let fixture: ComponentFixture<ThemMoiCoQuanBanHanhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemMoiCoQuanBanHanhComponent]
    });
    fixture = TestBed.createComponent(ThemMoiCoQuanBanHanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
