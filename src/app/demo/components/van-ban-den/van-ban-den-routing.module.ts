import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [RouterModule.forChild([
    { path: 'cap-nhat-moi', data: { breadcrumb: 'Button' }, loadChildren: () => import('./cap-nhat-moi/cap-nhat-moi.module').then(m => m.CapNhatMoiModule) },
  ])],
  exports: [RouterModule]
})
export class VanBanDenRoutingModule { }
