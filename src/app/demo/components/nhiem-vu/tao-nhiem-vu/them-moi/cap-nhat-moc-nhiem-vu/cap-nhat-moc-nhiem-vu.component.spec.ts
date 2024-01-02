import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatMocNhiemVuComponent } from './cap-nhat-moc-nhiem-vu.component';

describe('CapNhatMocNhiemVuComponent', () => {
  let component: CapNhatMocNhiemVuComponent;
  let fixture: ComponentFixture<CapNhatMocNhiemVuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapNhatMocNhiemVuComponent]
    });
    fixture = TestBed.createComponent(CapNhatMocNhiemVuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
