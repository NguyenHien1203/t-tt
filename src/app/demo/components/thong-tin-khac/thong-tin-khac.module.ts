import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThongTinKhacRoutingModule } from './thong-tin-khac-routing.module';
import { XemThongBaoComponent } from './xem-thong-bao/xem-thong-bao.component';
import { ChiTietComponent } from './xem-thong-bao/chi-tiet/chi-tiet.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ThongTinKhacRoutingModule
  ]
})
export class ThongTinKhacModule { }
