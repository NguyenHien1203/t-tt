import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DuyetPhieuTrinhRoutingModule } from './duyet-phieu-trinh-routing.module';
import { DuyetPhieuTrinhComponent } from './duyet-phieu-trinh.component';


@NgModule({
  declarations: [DuyetPhieuTrinhComponent],
  imports: [
    CommonModule,
    DuyetPhieuTrinhRoutingModule
  ]
})
export class DuyetPhieuTrinhModule { }
