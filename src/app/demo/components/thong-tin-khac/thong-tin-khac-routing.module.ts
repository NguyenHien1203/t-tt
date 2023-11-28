import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'quan-ly-thong-bao', data: { breadcrumb: 'Quản lý thông báo' }, loadChildren: () => import('./quan-ly-thong-bao/quan-ly-thong-bao.module').then(m => m.QuanLyThongBaoModule) },
  { path: 'xem-thong-bao', data: { breadcrumb: 'Xem thông báo' }, loadChildren: () => import('./xem-thong-bao/xem-thong-bao.module').then(m => m.XemThongBaoModule) },
  { path: 'quan-ly-bang-luong', data: { breadcrumb: 'Quản lý bảng lương' }, loadChildren: () => import('./quan-ly-bang-luong/quan-ly-bang-luong.module').then(m => m.QuanLyBangLuongModule) },
  { path: 'xem-bang-luong', data: { breadcrumb: 'Xem bảng lương' }, loadChildren: () => import('./xem-bang-luong/xem-bang-luong.module').then(m => m.XemBangLuongModule) },
  { path: 'quan-ly-tai-lieu-huong-dan', data: { breadcrumb: 'Quản lý tài liệu hướng dẫn' }, loadChildren: () => import('./quan-ly-tai-lieu-huong-dan/quan-ly-tai-lieu-huong-dan.module').then(m => m.QuanLyTaiLieuHuongDanModule) },
  { path: 'tai-lieu-huong-dan', data: { breadcrumb: 'Tài liệu hướng dẫn' }, loadChildren: () => import('./tai-lieu-huong-dan/tai-lieu-huong-dan.module').then(m => m.TaiLieuHuongDanModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThongTinKhacRoutingModule { }
