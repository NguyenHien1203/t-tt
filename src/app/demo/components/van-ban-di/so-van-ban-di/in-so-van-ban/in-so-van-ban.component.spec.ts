import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InSoVanBanComponent } from './in-so-van-ban.component';

describe('InSoVanBanComponent', () => {
  let component: InSoVanBanComponent;
  let fixture: ComponentFixture<InSoVanBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InSoVanBanComponent]
    });
    fixture = TestBed.createComponent(InSoVanBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
