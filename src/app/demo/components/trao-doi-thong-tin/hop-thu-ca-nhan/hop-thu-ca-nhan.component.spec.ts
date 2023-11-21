import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopThuCaNhanComponent } from './hop-thu-ca-nhan.component';

describe('HopThuCaNhanComponent', () => {
  let component: HopThuCaNhanComponent;
  let fixture: ComponentFixture<HopThuCaNhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HopThuCaNhanComponent]
    });
    fixture = TestBed.createComponent(HopThuCaNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
