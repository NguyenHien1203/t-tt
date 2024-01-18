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
    {
        path: 'quan-ly-tham-do-y-kien',
        data: { breadcrumb: 'Quản lý thăm dò ý kiến' },
        loadChildren: () =>
            import(
                './quan-ly-tham-do-y-kien/quan-ly-tham-do-y-kien.module'
            ).then((m) => m.QuanLyThamDoYKienModule),
    },
    {
        path: 'cau-hoi-thuong-gap',
        data: { breadcrumb: 'Câu hỏi thường gặp' },
        loadChildren: () =>
            import('./cau-hoi-thuong-gap/cau-hoi-thuong-gap.module').then(
                (m) => m.CauHoiThuongGapModule
            ),
    },
    {
        path: 'quan-ly-tai-lieu-huong-dan',
        data: { breadcrumb: 'Quản lý tài liệu hướng dẫn' },
        loadChildren: () =>
            import(
                './quan-ly-tai-lieu-huong-dan/quan-ly-tai-lieu-huong-dan.module'
            ).then((m) => m.QuanLyTaiLieuHuongDanModule),
    },
    {
        path: 'tai-lieu-huong-dan',
        data: { breadcrumb: 'Tài liệu hướng dẫn' },
        loadChildren: () =>
            import('./tai-lieu-huong-dan/tai-lieu-huong-dan.module').then(
                (m) => m.TaiLieuHuongDanModule
            ),
    },
    {
        path: 'hoat-dong-sap-toi',
        data: { breadcrumb: 'Hoạt động sắp tới' },
        loadChildren: () =>
            import('./hoat-dong-sap-toi/hoat-dong-sap-toi.module').then(
                (m) => m.HoatDongSapToiModule
            ),
    },
    {
        path: 'tham-do-y-kien',
        data: { breadcrumb: 'Thăm dò ý kiến' },
        loadChildren: () =>
            import('./tham-do-y-kien/tham-do-y-kien.module').then(
                (m) => m.ThamDoYKienModule
            )
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ThongTinKhacRoutingModule {}
