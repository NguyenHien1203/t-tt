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
                    import('./quan-ly-dat-lai-mat-khau/quan-ly-dat-lai-mat-khau.module').then(
                      (m) => m.QuanLyDatLaiMatKhauModule
                    ),
            },
        ]),
    ],
    exports: [RouterModule],
})
export class HeThongRoutingModule {}
