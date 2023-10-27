import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChucDanhRoutingModule } from './chuc-danh-routing.module';
import { ChucDanhComponent } from './chuc-danh.component';

@NgModule({
  imports: [
    CommonModule,
    ChucDanhRoutingModule,
  ],
  declarations: [ChucDanhComponent]
})
export class ChucDanhModule { }
