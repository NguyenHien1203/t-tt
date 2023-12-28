import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanQuyenComponent } from './gan-quyen.component';

describe('GanQuyenComponent', () => {
  let component: GanQuyenComponent;
  let fixture: ComponentFixture<GanQuyenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GanQuyenComponent]
    });
    fixture = TestBed.createComponent(GanQuyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
