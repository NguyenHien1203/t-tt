import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'quan-tri-van-ban-di', data: { breadcrumb: 'Quản trị văn bản đi' }, loadChildren: () => import('./quan-tri-van-ban-di/quan-tri-van-ban-di.module').then(m => m.QuanTriVanBanDiModule) },
  { path: 'cap-nhat-moi', data: { breadcrumb: 'Cập nhật mới' }, loadChildren: () => import('./cap-nhat-moi/cap-nhat-moi.module').then(m => m.CapNhatMoiModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VanBanDiRoutingModule { }
