import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonVanBanComponent } from './chon-van-ban.component';

describe('ChonVanBanComponent', () => {
  let component: ChonVanBanComponent;
  let fixture: ComponentFixture<ChonVanBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChonVanBanComponent]
    });
    fixture = TestBed.createComponent(ChonVanBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
