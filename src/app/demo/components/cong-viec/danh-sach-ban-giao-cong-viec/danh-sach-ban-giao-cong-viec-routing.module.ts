import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DanhSachBanGiaoCongViecComponent } from './danh-sach-ban-giao-cong-viec.component';
import { BanGiaoCongViecComponent } from './ban-giao-cong-viec/ban-giao-cong-viec.component';

const routes: Routes = [ {path: '', component: DanhSachBanGiaoCongViecComponent},
{ path: 'ban-giao-cong-viec', component: BanGiaoCongViecComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhSachBanGiaoCongViecRoutingModule { }
