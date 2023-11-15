import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuHoiComponent } from './thu-hoi.component';

describe('ThuHoiComponent', () => {
  let component: ThuHoiComponent;
  let fixture: ComponentFixture<ThuHoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThuHoiComponent]
    });
    fixture = TestBed.createComponent(ThuHoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
