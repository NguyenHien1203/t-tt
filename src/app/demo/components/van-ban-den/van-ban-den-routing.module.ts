import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule.forChild([
    { path: 'cap-nhat-moi', data: { breadcrumb: 'Button' }, loadChildren: () => import('./cap-nhat-moi/cap-nhat-moi.module').then(m => m.CapNhatMoiModule) },
    { path: 'them-moi', data: { breadcrumb: 'Button' }, loadChildren: () => import('./cap-nhat-moi/them-moi/them-moi.module').then(m => m.ThemMoiModule) },
    { path: 'tiep-nhan-van-ban', data: { breadcrumb: 'Button' }, loadChildren: () => import('./tiep-nhan-van-ban/tiep-nhan-van-ban.module').then(m => m.TiepNhanVanBanModule) },
    { path: 'but-phe-van-ban', data: { breadcrumb: 'Button' }, loadChildren: () => import('./but-phe-van-ban/but-phe-van-ban.module').then(m => m.ButPheVanBanModule) },
    { path: 'them-moi-cong-viec', data: { breadcrumb: 'Button' }, loadChildren: () => import('./but-phe-van-ban/them-moi-cong-viec/them-moi-cong-viec.module').then(m => m.ThemMoiCongViecModule) },
  ])],
  exports: [RouterModule]
})
export class VanBanDenRoutingModule { }
