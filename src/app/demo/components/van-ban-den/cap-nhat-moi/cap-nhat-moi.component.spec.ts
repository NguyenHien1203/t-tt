import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatMoiComponent } from './cap-nhat-moi.component';

describe('CapNhatMoiComponent', () => {
  let component: CapNhatMoiComponent;
  let fixture: ComponentFixture<CapNhatMoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapNhatMoiComponent]
    });
    fixture = TestBed.createComponent(CapNhatMoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
