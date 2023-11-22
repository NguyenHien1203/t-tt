import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopThuDiComponent } from './hop-thu-di.component';

describe('HopThuDiComponent', () => {
  let component: HopThuDiComponent;
  let fixture: ComponentFixture<HopThuDiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HopThuDiComponent]
    });
    fixture = TestBed.createComponent(HopThuDiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
