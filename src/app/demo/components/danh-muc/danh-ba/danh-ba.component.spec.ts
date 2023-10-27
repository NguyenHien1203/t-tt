import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhBaComponent } from './danh-ba.component';

describe('DanhBaComponent', () => {
  let component: DanhBaComponent;
  let fixture: ComponentFixture<DanhBaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DanhBaComponent]
    });
    fixture = TestBed.createComponent(DanhBaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
