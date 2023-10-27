import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'chuc-danh', data: { breadcrumb: "Chức Danh" }, loadChildren: () => import('./chuc-danh/chuc-danh.module').then(m => m.ChucDanhModule) },
      { path: 'linh-vuc', data: { breadcrumb: "Lĩnh Vực" }, loadChildren: () => import('./linh-vuc/linh-vuc.component').then(m => m.LinhVucComponent) },
      { path: 'danh-ba', data: { breadcrumb: "Danh bạ" }, loadChildren: () => import('./danh-ba/danh-ba.component').then(m => m.DanhBaComponent) },
    ])], 
  exports: [RouterModule]
})
export class DanhMucRoutingModule { }
