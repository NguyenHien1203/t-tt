import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MucDoTruyCapComponent } from './muc-do-truy-cap.component';

describe('MucDoTruyCapComponent', () => {
  let component: MucDoTruyCapComponent;
  let fixture: ComponentFixture<MucDoTruyCapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MucDoTruyCapComponent]
    });
    fixture = TestBed.createComponent(MucDoTruyCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
