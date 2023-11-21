import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanCaNhanComponent } from './nhan-ca-nhan.component';

describe('NhanCaNhanComponent', () => {
  let component: NhanCaNhanComponent;
  let fixture: ComponentFixture<NhanCaNhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhanCaNhanComponent]
    });
    fixture = TestBed.createComponent(NhanCaNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
