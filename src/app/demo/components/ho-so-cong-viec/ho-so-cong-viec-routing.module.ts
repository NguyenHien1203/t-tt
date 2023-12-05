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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HoSoCongViecRoutingModule {}
