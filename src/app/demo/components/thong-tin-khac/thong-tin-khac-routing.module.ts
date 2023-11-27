import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'quan-ly-thong-bao',
        data: { breadcrumb: 'Quản lý thông báo' },
        loadChildren: () =>
            import('./quan-ly-thong-bao/quan-ly-thong-bao.module').then(
                (m) => m.QuanLyThongBaoModule
            ),
    },
    {
        path: 'xem-thong-bao',
        data: { breadcrumb: 'Xem thông báo' },
        loadChildren: () =>
            import('./xem-thong-bao/xem-thong-bao.module').then(
                (m) => m.XemThongBaoModule
            ),
    },
    {
        path: 'quan-ly-bang-luong',
        data: { breadcrumb: 'Quản lý bảng lương' },
        loadChildren: () =>
            import('./quan-ly-bang-luong/quan-ly-bang-luong.module').then(
                (m) => m.QuanLyBangLuongModule
            ),
    },
    {
        path: 'xem-bang-luong',
        data: { breadcrumb: 'Xem bảng lương' },
        loadChildren: () =>
            import('./xem-bang-luong/xem-bang-luong.module').then(
                (m) => m.XemBangLuongModule
            ),
    },
    {
        path: 'quan-ly-cau-hoi-thuong-gap',
        data: { breadcrumb: 'Quản lý câu hỏi thường gặp' },
        loadChildren: () =>
            import(
                './quan-ly-cau-hoi-thuong-gap/quan-ly-cau-hoi-thuong-gap.module'
            ).then((m) => m.QuanLyCauHoiThuongGapModule),
    },
    {
        path: 'quan-ly-chuyen-muc-cau-hoi',
        data: { breadcrumb: 'Quản lý chuyên mục câu hỏi' },
        loadChildren: () =>
            import(
                './quan-ly-chuyen-muc-cau-hoi/quan-ly-chuyen-muc-cau-hoi.module'
            ).then((m) => m.QuanLyChuyenMucCauHoiModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ThongTinKhacRoutingModule {}
