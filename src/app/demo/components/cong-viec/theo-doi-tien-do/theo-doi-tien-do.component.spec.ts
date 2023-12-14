import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheoDoiTienDoComponent } from './theo-doi-tien-do.component';

describe('TheoDoiTienDoComponent', () => {
  let component: TheoDoiTienDoComponent;
  let fixture: ComponentFixture<TheoDoiTienDoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TheoDoiTienDoComponent]
    });
    fixture = TestBed.createComponent(TheoDoiTienDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
