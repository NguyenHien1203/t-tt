import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatTreecvComponent } from './cap-nhat-treecv.component';

describe('CapNhatTreecvComponent', () => {
  let component: CapNhatTreecvComponent;
  let fixture: ComponentFixture<CapNhatTreecvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapNhatTreecvComponent]
    });
    fixture = TestBed.createComponent(CapNhatTreecvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
