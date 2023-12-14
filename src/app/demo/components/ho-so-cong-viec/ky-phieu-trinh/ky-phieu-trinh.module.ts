import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KyPhieuTrinhRoutingModule } from './ky-phieu-trinh-routing.module';
import { KyPhieuTrinhComponent } from './ky-phieu-trinh.component';
import { XuLyComponent } from './xu-ly/xu-ly.component';


@NgModule({
  declarations: [KyPhieuTrinhComponent, XuLyComponent],
  imports: [
    CommonModule,
    KyPhieuTrinhRoutingModule
  ]
})
export class KyPhieuTrinhModule { }
