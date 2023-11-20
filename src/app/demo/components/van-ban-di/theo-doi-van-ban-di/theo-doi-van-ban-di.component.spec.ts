import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheoDoiVanBanDiComponent } from './theo-doi-van-ban-di.component';

describe('TheoDoiVanBanDiComponent', () => {
  let component: TheoDoiVanBanDiComponent;
  let fixture: ComponentFixture<TheoDoiVanBanDiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TheoDoiVanBanDiComponent]
    });
    fixture = TestBed.createComponent(TheoDoiVanBanDiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
