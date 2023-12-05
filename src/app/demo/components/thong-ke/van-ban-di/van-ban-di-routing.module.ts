import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VanBanDiComponent } from './van-ban-di.component';

const routes: Routes = [{path : '', component : VanBanDiComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VanBanDiRoutingModule { }
