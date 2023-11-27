import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'soan-thu',
        data: { breadcrumb: 'Soạn thư' },
        loadChildren: () =>
            import('./soan-thu/soan-thu.module').then((m) => m.SoanThuModule),
    },
    {
        path: 'hop-thu-den',
        data: { breadcrumb: 'Hộp thư đến' },
        loadChildren: () =>
            import('./hop-thu-den/hop-thu-den.module').then(
                (m) => m.HopThuDenModule
            ),
    },
    {
        path: 'hop-thu-di',
        data: { breadcrumb: 'Hộp thư đi' },
        loadChildren: () =>
            import('./hop-thu-di/hop-thu-di.module').then(
                (m) => m.HopThuDiModule
            ),
    },
    {
        path: 'hop-thu-nhap',
        data: { breadcrumb: 'Hộp thư nháp' },
        loadChildren: () =>
            import('./hop-thu-nhap/hop-thu-nhap.module').then(
                (m) => m.HopThuNhapModule
            ),
    },
    {
        path: 'hop-thu-quan-trong',
        data: { breadcrumb: 'Hộp thư quan trọng' },
        loadChildren: () =>
            import('./hop-thu-quan-trong/hop-thu-quan-trong.module').then(
                (m) => m.HopThuQuanTrongModule
            ),
    },
    {
        path: 'hop-thu-ca-nhan',
        data: { breadcrumb: 'Hộp thư cá nhân' },
        loadChildren: () =>
            import('./hop-thu-ca-nhan/hop-thu-ca-nhan.module').then(
                (m) => m.HopThuCaNhanModule
            ),
    },
    {
        path: 'nhan-ca-nhan',
        data: { breadcrumb: 'Nhãn cá nhân' },
        loadChildren: () =>
            import('./nhan-ca-nhan/nhan-ca-nhan.module').then(
                (m) => m.NhanCaNhanModule
            ),
    },
    {
        path: 'chi-tiet-trao-doi',
        data: { breadcrumb: 'Chi tiết trao đổi' },
        loadChildren: () =>
            import('./chi-tiet-trao-doi/chi-tiet-trao-doi.module').then(
                (m) => m.ChiTietTraoDoiModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TraoDoiThongTinRoutingModule {}
