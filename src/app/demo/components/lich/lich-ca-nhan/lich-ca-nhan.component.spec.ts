import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LichCaNhanComponent } from './lich-ca-nhan.component';

describe('LichCaNhanComponent', () => {
  let component: LichCaNhanComponent;
  let fixture: ComponentFixture<LichCaNhanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LichCaNhanComponent]
    });
    fixture = TestBed.createComponent(LichCaNhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
