import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanBanDenLienQuanComponent } from './van-ban-den-lien-quan.component';

describe('VanBanDenLienQuanComponent', () => {
  let component: VanBanDenLienQuanComponent;
  let fixture: ComponentFixture<VanBanDenLienQuanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VanBanDenLienQuanComponent]
    });
    fixture = TestBed.createComponent(VanBanDenLienQuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
