import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoSoCongViecCaNhanComponent } from './ho-so-cong-viec-ca-nhan.component';

describe('HoSoCongViecCaNhanComponent', () => {
  let component: HoSoCongViecCaNhanComponent;
  let fixture: ComponentFixture<HoSoCongViecCaNhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoSoCongViecCaNhanComponent]
    });
    fixture = TestBed.createComponent(HoSoCongViecCaNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
