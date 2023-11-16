import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayLaiComponent } from './lay-lai.component';

describe('LayLaiComponent', () => {
  let component: LayLaiComponent;
  let fixture: ComponentFixture<LayLaiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayLaiComponent]
    });
    fixture = TestBed.createComponent(LayLaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
