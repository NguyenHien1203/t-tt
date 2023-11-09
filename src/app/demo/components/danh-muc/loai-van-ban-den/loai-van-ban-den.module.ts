import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaiVanBanDenRoutingModule } from './loai-van-ban-den-routing.module';
import { LoaiVanBanDenComponent } from './loai-van-ban-den.component';


@NgModule({
  declarations: [LoaiVanBanDenComponent],
  imports: [
    CommonModule,
    LoaiVanBanDenRoutingModule
  ]
})
export class LoaiVanBanDenModule { }
