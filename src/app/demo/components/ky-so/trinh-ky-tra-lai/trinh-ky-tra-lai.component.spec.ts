import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrinhKyTraLaiComponent } from './trinh-ky-tra-lai.component';

describe('TrinhKyTraLaiComponent', () => {
  let component: TrinhKyTraLaiComponent;
  let fixture: ComponentFixture<TrinhKyTraLaiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrinhKyTraLaiComponent]
    });
    fixture = TestBed.createComponent(TrinhKyTraLaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
