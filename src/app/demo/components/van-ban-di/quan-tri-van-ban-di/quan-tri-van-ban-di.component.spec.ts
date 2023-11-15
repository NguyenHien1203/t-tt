import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanTriVanBanDiComponent } from './quan-tri-van-ban-di.component';

describe('QuanTriVanBanDiComponent', () => {
  let component: QuanTriVanBanDiComponent;
  let fixture: ComponentFixture<QuanTriVanBanDiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanTriVanBanDiComponent]
    });
    fixture = TestBed.createComponent(QuanTriVanBanDiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
