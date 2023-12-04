import { LichTinhUyModule } from './lich-tinh-uy/lich-tinh-uy.module';
import { LichTinhUy } from './../../../models/thong-tin-khac/lich/lich-tinh-uy';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'lich-ca-nhan',
        data: { breadcrumb: 'Lịch cá nhân' },
        loadChildren: () =>
            import('./lich-ca-nhan/lich-ca-nhan.module').then(
                (m) => m.LichCaNhanModule
            ),
    },
    {
        path: 'quan-tri-lich',
        data: { breadcrumb: 'Quản trị lịch' },
        loadChildren: () =>
            import('./quan-tri-lich/quan-tri-lich.module').then(
                (m) => m.QuanTriLichModule
            ),
    },
    {
        path: 'quan-tri-lich-phong-ban',
        data: { breadcrumb: 'Quản trị lịch phòng ban' },
        loadChildren: () =>
            import('./quan-tri-lich-phong-ban/quan-tri-lich-phong-ban.module').then(
                (m) => m.QuanTriLichPhongBanModule
            ),
    },
    {
        path: 'lich-co-quan',
        data: { breadcrumb: 'Lịch cơ quan' },
        loadChildren: () =>
            import('./lich-co-quan/lich-co-quan.module').then(
                (m) => m.LichCoQuanModule
            ),
    },
     {
        path: 'lich-ubnd-tinh',
        data: { breadcrumb: 'Lịch ủy ban nhân dân tỉnh' },
        loadChildren: () =>
            import('./lich-ubnd-tinh/lich-ubnd-tinh.module').then(
                (m) => m.LichUbndTinhModule
            ),
    },
     {
        path: 'lich-hdnd-va-dbqh',
        data: { breadcrumb: 'Lịch hội đồng nhân dân và đại biểu quốc hội' },
        loadChildren: () =>
            import('./lich-hdnd-va-dbqh/lich-hdnd-va-dbqh.module').then(
                (m) => m.LichHdndVaDbqhModule
            ),
    },
     {
        path: 'lich-tinh-uy',
        data: { breadcrumb: 'Lịch ủy ban nhân dân tỉnh' },
        loadChildren: () =>
            import('./lich-tinh-uy/lich-tinh-uy.module').then(
                (m) => m.LichTinhUyModule
            ),
    },
    {
        path: 'lich-hop',
        data: { breadcrumb: 'Lịch họp' },
        loadChildren: () =>
            import('./lich-ca-nhan/lich-ca-nhan.module').then(
                (m) => m.LichCaNhanModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LichRoutingModule {}
