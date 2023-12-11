import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'danh-muc-ho-so-co-quan',
        data: { breadcrumb: 'Danh mục hồ sơ cơ quan' },
        loadChildren: () =>
            import(
                './danh-muc-ho-so-co-quan/danh-muc-ho-so-co-quan.module'
            ).then((m) => m.DanhMucHoSoCoQuanModule),
    },
    {
        path: 'danh-muc-ho-so-ca-nhan',
        data: { breadcrumb: 'Danh mục hồ sơ cá nhân' },
        loadChildren: () =>
            import(
                './danh-muc-ho-so-ca-nhan/danh-muc-ho-so-ca-nhan.module'
            ).then((m) => m.DanhMucHoSoCaNhanModule),
    },
    {
        path: 'quan-ly-ho-so-ca-nhan',
        data: { breadcrumb: 'Quản lý hồ sơ cơ quan cá nhân' },
        loadChildren: () =>
            import('./quan-ly-ho-so-ca-nhan/quan-ly-ho-so-ca-nhan.module').then(
                (m) => m.QuanLyHoSoCaNhanModule
            ),
    },
    {
        path: 'quan-ly-ho-so-co-quan',
        data: { breadcrumb: 'Quản lý hồ sơ cơ quan' },
        loadChildren: () =>
            import('./quan-ly-ho-so-co-quan/quan-ly-ho-so-co-quan.module').then(
                (m) => m.QuanLyHoSoCoQuanModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HoSoCongViecRoutingModule {}
