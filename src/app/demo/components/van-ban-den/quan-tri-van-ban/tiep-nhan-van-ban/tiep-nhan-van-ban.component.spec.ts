import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiepNhanVanBanComponent } from './tiep-nhan-van-ban.component';

describe('TiepNhanVanBanComponent', () => {
  let component: TiepNhanVanBanComponent;
  let fixture: ComponentFixture<TiepNhanVanBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiepNhanVanBanComponent]
    });
    fixture = TestBed.createComponent(TiepNhanVanBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
