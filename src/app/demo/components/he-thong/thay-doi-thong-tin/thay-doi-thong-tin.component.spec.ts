import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThayDoiThongTinComponent } from './thay-doi-thong-tin.component';

describe('ThayDoiThongTinComponent', () => {
  let component: ThayDoiThongTinComponent;
  let fixture: ComponentFixture<ThayDoiThongTinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThayDoiThongTinComponent]
    });
    fixture = TestBed.createComponent(ThayDoiThongTinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
