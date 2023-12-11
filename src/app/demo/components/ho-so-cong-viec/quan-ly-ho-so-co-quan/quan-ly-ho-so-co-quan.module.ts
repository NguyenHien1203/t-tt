import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyHoSoCoQuanRoutingModule } from './quan-ly-ho-so-co-quan-routing.module';
import { QuanLyHoSoCoQuanComponent } from './quan-ly-ho-so-co-quan.component';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { ChonVanBanComponent } from './chon-van-ban/chon-van-ban.component';
import { ChonCongViecComponent } from './chon-cong-viec/chon-cong-viec.component';
import { ChonPhieuTrinhComponent } from './chon-phieu-trinh/chon-phieu-trinh.component';


@NgModule({
  declarations: [QuanLyHoSoCoQuanComponent, CapNhatComponent, ThemMoiComponent, ChonVanBanComponent, ChonCongViecComponent, ChonPhieuTrinhComponent],
  imports: [
    CommonModule,
    QuanLyHoSoCoQuanRoutingModule
  ]
})
export class QuanLyHoSoCoQuanModule { }
