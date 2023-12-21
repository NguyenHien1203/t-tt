import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'bieu-do-thong-ke-theo-tieu-chi',
        data: { breadcrumb: 'Biểu đồ thống kê theo tiêu chí' },
        loadChildren: () =>
            import(
                './bieu-do-thong-ke-theo-tieu-chi/bieu-do-thong-ke-theo-tieu-chi.module'
            ).then((m) => m.BieuDoThongKeTheoTieuChiModule),
    },
    {
        path: 'bieu-do-thong-ke-theo-linh-vuc',
        data: { breadcrumb: 'Biểu đồ thống kê theo lĩnh vực' },
        loadChildren: () =>
            import(
                './bieu-do-thong-ke-theo-linh-vuc/bieu-do-thong-ke-theo-linh-vuc.module'
            ).then((m) => m.BieuDoThongKeTheoLinhVucModule),
    },
    {
        path: 'bieu-do-thong-ke-theo-bang',
        data: { breadcrumb: 'Biểu đồ thống kê theo bang' },
        loadChildren: () =>
            import(
                './bieu-do-thong-ke-theo-bang/bieu-do-thong-ke-theo-bang.module'
            ).then((m) => m.BieuDoThongKeTheoBangModule),
    },
     {
        path: 'bieu-do-thong-ke-theo-loai-nhiem-vu',
        data: { breadcrumb: 'Biểu đồ thống kê theo bang' },
        loadChildren: () =>
            import(
                './bieu-do-thong-ke-theo-loai-nhiem-vu/bieu-do-thong-ke-theo-loai-nhiem-vu.module'
            ).then((m) => m.BieuDoThongKeTheoLoaiNhiemVuModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ThongKeNhiemVuRoutingModule {}
