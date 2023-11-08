import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThongTinKhacRoutingModule } from './thong-tin-khac-routing.module';
import { XemThongBaoComponent } from './xem-thong-bao/xem-thong-bao.component';
import { ChiTietComponent } from './xem-thong-bao/chi-tiet/chi-tiet.component';
import { QuanLyBangLuongComponent } from './quan-ly-bang-luong/quan-ly-bang-luong.component';
import { ThemMoiComponent } from './quan-ly-bang-luong/them-moi/them-moi.component';
import { CapNhatComponent } from './quan-ly-bang-luong/cap-nhat/cap-nhat.component';
import { XemBangLuongComponent } from './xem-bang-luong/xem-bang-luong.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ThongTinKhacRoutingModule
  ]
})
export class ThongTinKhacModule { }
