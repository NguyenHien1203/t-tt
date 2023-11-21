import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanTriVanBanComponent } from './quan-tri-van-ban.component';

describe('QuanTriVanBanComponent', () => {
  let component: QuanTriVanBanComponent;
  let fixture: ComponentFixture<QuanTriVanBanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanTriVanBanComponent]
    });
    fixture = TestBed.createComponent(QuanTriVanBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
