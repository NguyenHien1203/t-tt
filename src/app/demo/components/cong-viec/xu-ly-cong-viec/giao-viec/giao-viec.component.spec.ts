import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaoViecComponent } from './giao-viec.component';

describe('GiaoViecComponent', () => {
  let component: GiaoViecComponent;
  let fixture: ComponentFixture<GiaoViecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GiaoViecComponent]
    });
    fixture = TestBed.createComponent(GiaoViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
