import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanBanDiLienQuanComponent } from './van-ban-di-lien-quan.component';

describe('VanBanDiLienQuanComponent', () => {
  let component: VanBanDiLienQuanComponent;
  let fixture: ComponentFixture<VanBanDiLienQuanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VanBanDiLienQuanComponent]
    });
    fixture = TestBed.createComponent(VanBanDiLienQuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
