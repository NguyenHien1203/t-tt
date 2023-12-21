import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BieuDoThongKeTheoBangComponent } from './bieu-do-thong-ke-theo-bang.component';

describe('BieuDoThongKeTheoBangComponent', () => {
  let component: BieuDoThongKeTheoBangComponent;
  let fixture: ComponentFixture<BieuDoThongKeTheoBangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BieuDoThongKeTheoBangComponent]
    });
    fixture = TestBed.createComponent(BieuDoThongKeTheoBangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
