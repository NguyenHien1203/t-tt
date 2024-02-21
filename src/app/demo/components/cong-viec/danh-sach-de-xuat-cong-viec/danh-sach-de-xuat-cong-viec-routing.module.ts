import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DanhSachDeXuatCongViecComponent } from './danh-sach-de-xuat-cong-viec.component';


const routes: Routes = [{path : '' , component : DanhSachDeXuatCongViecComponent}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhSachDeXuatCongViecRoutingModule { }
