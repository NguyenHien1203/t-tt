import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
      { path: 'tai-khoan', data: { breadcrumb: 'Button' }, loadChildren: () => import('./tai-khoan/tai-khoan.module').then(m => m.TaiKhoanModule) },
  ])],
  exports: [RouterModule]
})
export class HeThongRoutingModule { }
