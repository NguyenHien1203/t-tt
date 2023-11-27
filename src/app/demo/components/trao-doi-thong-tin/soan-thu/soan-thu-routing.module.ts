import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoanThuComponent } from './soan-thu.component';

const routes: Routes = [{path :'' , component : SoanThuComponent,
children: [
  {
      path: ':type/:traoDoiId', // Tham số ncn
      component: SoanThuComponent,
  },
],}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoanThuRoutingModule { }
