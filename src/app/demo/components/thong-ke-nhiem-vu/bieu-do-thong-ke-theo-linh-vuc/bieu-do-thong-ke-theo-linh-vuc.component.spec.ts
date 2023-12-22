import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BieuDoThongKeTheoLinhVucComponent } from './bieu-do-thong-ke-theo-linh-vuc.component';

describe('BieuDoThongKeTheoLinhVucComponent', () => {
  let component: BieuDoThongKeTheoLinhVucComponent;
  let fixture: ComponentFixture<BieuDoThongKeTheoLinhVucComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BieuDoThongKeTheoLinhVucComponent]
    });
    fixture = TestBed.createComponent(BieuDoThongKeTheoLinhVucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
