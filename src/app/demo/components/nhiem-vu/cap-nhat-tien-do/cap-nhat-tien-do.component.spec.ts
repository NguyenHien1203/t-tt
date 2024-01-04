import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatTienDoComponent } from './cap-nhat-tien-do.component';

describe('CapNhatTienDoComponent', () => {
  let component: CapNhatTienDoComponent;
  let fixture: ComponentFixture<CapNhatTienDoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapNhatTienDoComponent]
    });
    fixture = TestBed.createComponent(CapNhatTienDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
