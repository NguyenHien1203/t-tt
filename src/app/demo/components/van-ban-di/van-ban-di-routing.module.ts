import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path : 'cap-nhat-moi', data : {breadcrumb: 'Cập nhật mới'}, loadChildren :  () => import('./cap-nhat-moi/cap-nhat-moi.module').then(m=> m.CapNhatMoiModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VanBanDiRoutingModule { }
