import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule.forChild([
    { path: 'cap-nhat-moi', data: { breadcrumb: 'Button' }, loadChildren: () => import('./cap-nhat-moi/cap-nhat-moi.module').then(m => m.CapNhatMoiModule) },
    { path: 'them-moi', data: { breadcrumb: 'Button' }, loadChildren: () => import('./cap-nhat-moi/them-moi/them-moi.module').then(m => m.ThemMoiModule) },
  ])],
  exports: [RouterModule]
})
export class VanBanDenRoutingModule { }
