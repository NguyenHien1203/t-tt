import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhVucComponent } from './linh-vuc.component';

describe('LinhVucComponent', () => {
  let component: LinhVucComponent;
  let fixture: ComponentFixture<LinhVucComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinhVucComponent]
    });
    fixture = TestBed.createComponent(LinhVucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
