import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'cap-nhat-moi',
        data: { breadcrumb: 'Cập nhật mới' },
        loadChildren: () =>
            import('./cap-nhat-moi/cap-nhat-moi.module').then(
                (m) => m.CapNhatMoiModule
            ),
    },
    {
        path: 'tra-cuu-don-gian',
        data: { breadcrumb: 'Tra cứu đơn giản' },
        loadChildren: () =>
            import('./tra-cuu-don-gian/tra-cuu-don-gian.module').then(
                (m) => m.TraCuuDonGianModule
            ),
    },
    {
        path: 'quan-tri-van-ban-di',
        data: { breadcrumb: 'Quản trị văn bản đi' },
        loadChildren: () =>
            import('./quan-tri-van-ban-di/quan-tri-van-ban-di.module').then(
                (m) => m.QuanTriVanBanDiModule
            ),
    },
    {
        path: 'gui-van-ban',
        data: { breadcrumb: 'Gửi văn bản đi' },
        loadChildren: () =>
            import('./gui-van-ban/gui-van-ban.module').then(
                (m) => m.GuiVanBanModule
            ),
    },
    {
        path: 'tra-cuu-nang-cao',
        data: { breadcrumb: 'Tra cứu nâng cao' },
        loadChildren: () =>
            import('./tra-cuu-nang-cao/tra-cuu-nang-cao.module').then(
                (m) => m.TraCuuNangCaoModule
            ),
    },
    {
        path: 'so-van-ban-di',
        data: { breadcrumb: 'Sổ văn bản đi' },
        loadChildren: () =>
            import('./so-van-ban-di/so-van-ban-di.module').then(
                (m) => m.SoVanBanDiModule
            ),
    },
    {
        path: 'theo-doi-van-ban-di',
        data: { breadcrumb: 'Theo dõi văn bản đi' },
        loadChildren: () =>
            import('./theo-doi-van-ban-di/theo-doi-van-ban-di.module').then(
                (m) => m.TheoDoiVanBanDiModule
            ),
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VanBanDiRoutingModule {}
