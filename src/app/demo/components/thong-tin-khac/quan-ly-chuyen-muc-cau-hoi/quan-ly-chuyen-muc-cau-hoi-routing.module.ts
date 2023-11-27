import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanLyChuyenMucCauHoiComponent } from './quan-ly-chuyen-muc-cau-hoi.component';

const routes: Routes = [{path : '', component : QuanLyChuyenMucCauHoiComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyChuyenMucCauHoiRoutingModule { }
