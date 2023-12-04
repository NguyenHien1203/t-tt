import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VanBanNhanComponent } from './van-ban-nhan.component';

const routes: Routes = [{path : '', component : VanBanNhanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VanBanNhanRoutingModule { }
