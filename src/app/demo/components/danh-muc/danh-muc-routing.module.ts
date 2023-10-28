import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
      { path: 'chuc-danh', data: { breadcrumb: 'Chức Danh' }, loadChildren: () => import('./chuc-danh/chuc-danh.module').then(m => m.ChucDanhModule) },
      { path: 'lien-ket', data: { breadcrumb: 'Liên Kết' }, loadChildren: () => import('./lien-ket/lien-ket.module').then(m => m.LienKetModule) },
  ])],
  exports: [RouterModule]
})
export class DanhMucRoutingModule { }
