import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoQuanBanHanhComponent } from './co-quan-ban-hanh.component';

describe('CoQuanBanHanhComponent', () => {
  let component: CoQuanBanHanhComponent;
  let fixture: ComponentFixture<CoQuanBanHanhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoQuanBanHanhComponent]
    });
    fixture = TestBed.createComponent(CoQuanBanHanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
