import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhMucRoutingModule } from './danh-muc-routing.module';
import { CoQuanBanHanhComponent } from './co-quan-ban-hanh/co-quan-ban-hanh.component';

@NgModule({
  imports: [
    CommonModule,
    DanhMucRoutingModule
  ],
  declarations: [
  
    CoQuanBanHanhComponent
  ]
})
export class DanhMucModule { }
