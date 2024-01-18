import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuChoiDuyetCongViecComponent } from './tu-choi-duyet-cong-viec.component';

describe('TuChoiDuyetCongViecComponent', () => {
  let component: TuChoiDuyetCongViecComponent;
  let fixture: ComponentFixture<TuChoiDuyetCongViecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TuChoiDuyetCongViecComponent]
    });
    fixture = TestBed.createComponent(TuChoiDuyetCongViecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
