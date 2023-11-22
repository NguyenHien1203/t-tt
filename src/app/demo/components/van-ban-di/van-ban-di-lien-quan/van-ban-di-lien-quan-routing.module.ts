import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VanBanDiLienQuanComponent } from './van-ban-di-lien-quan.component';

const routes: Routes = [{path : '', component : VanBanDiLienQuanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VanBanDiLienQuanRoutingModule { }
