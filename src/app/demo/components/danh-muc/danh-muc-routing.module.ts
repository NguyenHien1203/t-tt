import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([

    { path: 'chuc-danh', data: { breadcrumb: 'Button' }, loadChildren: () => import('./chuc-danh/chuc-danh.module').then(m => m.ChucDanhModule) },
    { path: 'danh-ba', data: { breadcrumb: 'Button' }, loadChildren: () => import('./danh-ba/danh-ba.module').then(m => m.DanhBaModule) },
    { path: 'phong-ban', data: { breadcrumb: 'Button' }, loadChildren: () => import('./phong-ban/phong-ban.module').then(m => m.PhongBanModule) },
    { path: 'lien-ket', data: { breadcrumb: 'Liên Kết' }, loadChildren: () => import('./lien-ket/lien-ket.module').then(m => m.LienKetModule) },
  ])],
  exports: [RouterModule]
})
export class DanhMucRoutingModule { }
