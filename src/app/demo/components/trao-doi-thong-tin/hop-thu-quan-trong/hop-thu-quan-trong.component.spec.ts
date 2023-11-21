import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopThuQuanTrongComponent } from './hop-thu-quan-trong.component';

describe('HopThuQuanTrongComponent', () => {
  let component: HopThuQuanTrongComponent;
  let fixture: ComponentFixture<HopThuQuanTrongComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HopThuQuanTrongComponent]
    });
    fixture = TestBed.createComponent(HopThuQuanTrongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
