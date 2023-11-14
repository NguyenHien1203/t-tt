import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VanBanDiRoutingModule } from './van-ban-di-routing.module';
import { CapNhatMoiComponent } from './cap-nhat-moi/cap-nhat-moi.component';
import { QuanTriVanBanDiComponent } from './quan-tri-van-ban-di/quan-tri-van-ban-di.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    VanBanDiRoutingModule
  ]
})
export class VanBanDiModule { }
