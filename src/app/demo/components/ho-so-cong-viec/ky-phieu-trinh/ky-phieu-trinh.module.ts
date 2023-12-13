import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KyPhieuTrinhRoutingModule } from './ky-phieu-trinh-routing.module';
import { KyPhieuTrinhComponent } from './ky-phieu-trinh.component';


@NgModule({
  declarations: [KyPhieuTrinhComponent],
  imports: [
    CommonModule,
    KyPhieuTrinhRoutingModule
  ]
})
export class KyPhieuTrinhModule { }
