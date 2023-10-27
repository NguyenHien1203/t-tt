import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'chuc-danh', data: { breadcrumb: "Chức Danh" }, loadChildren: () => import('./chuc-danh/chuc-danh.module').then(m => m.ChucDanhModule) }
    ])], 
  exports: [RouterModule]
})
export class DanhMucRoutingModule { }
