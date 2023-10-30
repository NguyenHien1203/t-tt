import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhMucRoutingModule } from './danh-muc-routing.module';
import { LienKetComponent } from './lien-ket/lien-ket.component';

@NgModule({
  imports: [
    CommonModule,
    DanhMucRoutingModule
  ]
})
export class DanhMucModule { }
