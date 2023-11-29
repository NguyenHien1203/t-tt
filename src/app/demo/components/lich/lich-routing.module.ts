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
            import('./lich-ca-nhan/lich-ca-nhan.module').then(
                (m) => m.LichCaNhanModule
            ),
    },
    {
        path: 'lich-co-quan',
        data: { breadcrumb: 'Lịch cơ quan' },
        loadChildren: () =>
            import('./lich-ca-nhan/lich-ca-nhan.module').then(
                (m) => m.LichCaNhanModule
            ),
    },
     {
        path: 'lich-uy-ban-nhan-dan-tinh',
        data: { breadcrumb: 'Lịch ủy ban nhân dân tỉnh' },
        loadChildren: () =>
            import('./lich-ca-nhan/lich-ca-nhan.module').then(
                (m) => m.LichCaNhanModule
            ),
    },
     {
        path: 'lich-hoi-dong-nhan-dan-va-dai-bieu-quoc-hoi',
        data: { breadcrumb: 'Lịch hội đồng nhân dân và đại biểu quốc hội' },
        loadChildren: () =>
            import('./lich-ca-nhan/lich-ca-nhan.module').then(
                (m) => m.LichCaNhanModule
            ),
    },
     {
        path: 'lich-tinh-uy',
        data: { breadcrumb: 'Lịch ủy ban nhân dân tỉnh' },
        loadChildren: () =>
            import('./lich-ca-nhan/lich-ca-nhan.module').then(
                (m) => m.LichCaNhanModule
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
