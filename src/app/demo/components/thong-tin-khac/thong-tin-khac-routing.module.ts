import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path : 'quan-ly-thong-bao', data: { breadcrumb: 'Quản lý thông báo' }, loadChildren: () => import('./quan-ly-thong-bao/quan-ly-thong-bao.module').then(m => m.QuanLyThongBaoModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThongTinKhacRoutingModule { }
