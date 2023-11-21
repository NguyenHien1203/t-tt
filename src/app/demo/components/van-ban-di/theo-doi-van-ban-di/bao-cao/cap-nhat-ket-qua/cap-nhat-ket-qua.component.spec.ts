import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatKetQuaComponent } from './cap-nhat-ket-qua.component';

describe('CapNhatKetQuaComponent', () => {
  let component: CapNhatKetQuaComponent;
  let fixture: ComponentFixture<CapNhatKetQuaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapNhatKetQuaComponent]
    });
    fixture = TestBed.createComponent(CapNhatKetQuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
