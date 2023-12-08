import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HoSoCongViecRoutingModule } from './ho-so-cong-viec-routing.module';
import { QuanLyHoSoCoQuanComponent } from './quan-ly-ho-so-co-quan/quan-ly-ho-so-co-quan.component';
import { QuanLyHoSoCaNhanComponent } from './quan-ly-ho-so-ca-nhan/quan-ly-ho-so-ca-nhan.component';

@NgModule({
  declarations: [
  
    QuanLyHoSoCoQuanComponent,
       QuanLyHoSoCaNhanComponent
  ],
  imports: [
    CommonModule,
    HoSoCongViecRoutingModule
  ]
})
export class HoSoCongViecModule { }
