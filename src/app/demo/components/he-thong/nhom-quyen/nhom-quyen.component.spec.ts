import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomQuyenComponent } from './nhom-quyen.component';

describe('NhomQuyenComponent', () => {
  let component: NhomQuyenComponent;
  let fixture: ComponentFixture<NhomQuyenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhomQuyenComponent]
    });
    fixture = TestBed.createComponent(NhomQuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
