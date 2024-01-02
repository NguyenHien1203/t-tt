import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuyetNhiemVuComponent } from './duyet-nhiem-vu.component';

describe('DuyetNhiemVuComponent', () => {
  let component: DuyetNhiemVuComponent;
  let fixture: ComponentFixture<DuyetNhiemVuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuyetNhiemVuComponent]
    });
    fixture = TestBed.createComponent(DuyetNhiemVuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
