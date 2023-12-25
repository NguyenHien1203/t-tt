import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'tai-khoan',
                data: { breadcrumb: 'Button' },
                loadChildren: () =>
                    import('./tai-khoan/tai-khoan.module').then(
                        (m) => m.TaiKhoanModule
                    ),
            },
            {
                path: 'thay-doi-thong-tin',
                data: { breadcrumb: 'Thay đổi thông tin' },
                loadChildren: () =>
                    import(
                        './thay-doi-thong-tin/thay-doi-thong-tin.module'
                    ).then((m) => m.ThayDoiThongTinModule),
            },
            {
                path: 'doi-mat-khau',
                data: { breadcrumb: 'Đổi mật khẩu' },
                loadChildren: () =>
                    import('./doi-mat-khau/doi-mat-khau.module').then(
                        (m) => m.DoiMatKhauModule
                    ),
            },
            {
                path: 'quan-ly-dat-lai-mat-khau',
                data: { breadcrumb: 'Đổi mật khẩu' },
                loadChildren: () =>
                    import(
                        './quan-ly-dat-lai-mat-khau/quan-ly-dat-lai-mat-khau.module'
                    ).then((m) => m.QuanLyDatLaiMatKhauModule),
            },
            {
                path: 'quan-ly-nhan',
                data: { breadcrumb: 'Quản lý nhãn' },
                loadChildren: () =>
                    import('./quan-ly-nhan/quan-ly-nhan.module').then(
                        (m) => m.QuanLyNhanModule
                    ),
            },
            {
                path: 'nhom-tai-khoan-chung',
                data: { breadcrumb: 'Nhóm tài khoản chung' },
                loadChildren: () =>
                    import(
                        './nhom-tai-khoan-chung/nhom-tai-khoan-chung.module'
                    ).then((m) => m.NhomTaiKhoanChungModule),
            },
            {
                path: 'nhom-tai-khoan-ca-nhan',
                data: { breadcrumb: 'Nhóm tài khoản cá nhân' },
                loadChildren: () =>
                    import(
                        './nhom-tai-khoan-ca-nhan/nhom-tai-khoan-ca-nhan.module'
                    ).then((m) => m.NhomTaiKhoanCaNhanModule),
            },
            {
                path: 'nhom-tai-khoan-don-vi',
                data: { breadcrumb: 'Nhóm tài khoản đơn vị' },
                loadChildren: () =>
                    import(
                        './nhom-tai-khoan-don-vi/nhom-tai-khoan-don-vi.module'
                    ).then((m) => m.NhomTaiKhoanDonViModule),
            },
            {
                path: 'nhom-tai-khoan-phong-ban',
                data: { breadcrumb: 'Nhóm tài khoản đơn vị' },
                loadChildren: () =>
                    import(
                        './nhom-tai-khoan-phong-ban/nhom-tai-khoan-phong-ban.module'
                    ).then((m) => m.NhomTaiKhoanPhongBanModule),
            },
        ]),
    ],
    exports: [RouterModule],
})
export class HeThongRoutingModule {}
