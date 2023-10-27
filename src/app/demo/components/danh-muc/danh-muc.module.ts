import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhMucRoutingModule } from './danh-muc-routing.module';
import { DanhBaComponent } from './danh-ba/danh-ba.component';

@NgModule({
  imports: [
    CommonModule,
    DanhMucRoutingModule
  ],
  declarations: [
    DanhBaComponent
  ]
})
export class DanhMucModule { }
