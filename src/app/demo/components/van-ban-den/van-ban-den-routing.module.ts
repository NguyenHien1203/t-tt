import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule.forChild([
    { path: 'cap-nhat-moi', data: { breadcrumb: 'Button' }, loadChildren: () => import('./cap-nhat-moi/cap-nhat-moi.module').then(m => m.CapNhatMoiModule) },
    { path: 'them-moi', data: { breadcrumb: 'Button' }, loadChildren: () => import('./cap-nhat-moi/them-moi/them-moi.module').then(m => m.ThemMoiModule) },
    { path: 'tiep-nhan-van-ban', data: { breadcrumb: 'Button' }, loadChildren: () => import('./tiep-nhan-van-ban/tiep-nhan-van-ban.module').then(m => m.TiepNhanVanBanModule) },
    { path: 'but-phe-van-ban', data: { breadcrumb: 'Button' }, loadChildren: () => import('./but-phe-van-ban/but-phe-van-ban.module').then(m => m.ButPheVanBanModule) },
    { path: 'them-moi-cong-viec', data: { breadcrumb: 'Button' }, loadChildren: () => import('./but-phe-van-ban/them-moi-cong-viec/them-moi-cong-viec.module').then(m => m.ThemMoiCongViecModule) },
    { path: 'sua-but-phe-van-ban', data: { breadcrumb: 'Button' }, loadChildren: () => import('./sua-but-phe-van-ban/sua-but-phe-van-ban.module').then(m => m.SuaButPheVanBanModule) },
    { path: 'sua-cong-viec', data: { breadcrumb: 'Button' }, loadChildren: () => import('./sua-but-phe-van-ban/sua-cong-viec/sua-cong-viec.module').then(m => m.SuaCongViecModule) },
    { path: 'quan-tri-van-ban', data: { breadcrumb: 'Button' }, loadChildren: () => import('./quan-tri-van-ban/quan-tri-van-ban.module').then(m => m.QuanTriVanBanModule) },
    { path: 'tra-cuu-don-gian', data: { breadcrumb: 'Button' }, loadChildren: () => import('./tra-cuu-don-gian/tra-cuu-don-gian.module').then(m => m.TraCuuDonGianModule) },
    { path: 'tra-cuu-nang-cao', data: { breadcrumb: 'Button' }, loadChildren: () => import('./tra-cuu-nang-cao/tra-cuu-nang-cao.module').then(m => m.TraCuuNangCaoModule) },
    { path: 'tim-kiem-theo-so-van-ban', data: { breadcrumb: 'Button' }, loadChildren: () => import('./tim-kiem-theo-so-van-ban/tim-kiem-theo-so-van-ban.module').then(m => m.TimKiemTheoSoVanBanModule) },
    { path: 'van-ban-da-tu-choi', data: { breadcrumb: 'Button' }, loadChildren: () => import('./van-ban-da-tu-choi/van-ban-da-tu-choi.module').then(m => m.VanBanDaTuChoiModule) },
    { path: 'van-ban-cho-thu-hoi', data: { breadcrumb: 'Button' }, loadChildren: () => import('./van-ban-cho-thu-hoi/van-ban-cho-thu-hoi.module').then(m => m.VanBanChoThuHoiModule) },
    { path: 'van-ban-da-thu-hoi', data: { breadcrumb: 'Button' }, loadChildren: () => import('./van-ban-da-thu-hoi/van-ban-da-thu-hoi.module').then(m => m.VanBanDaThuHoiModule) },
    { path: 'van-ban-den-lien-quan', data: { breadcrumb: 'Button' }, loadChildren: () => import('./van-ban-den-lien-quan/van-ban-den-lien-quan.module').then(m => m.VanBanDenLienQuanModule) },
    { path: 'van-ban-phai-bao-cao', data: { breadcrumb: 'Button' }, loadChildren: () => import('./van-ban-phai-bao-cao/van-ban-phai-bao-cao.module').then(m => m.VanBanPhaiBaoCaoModule) },
  ])],
  exports: [RouterModule]
})
export class VanBanDenRoutingModule { }
