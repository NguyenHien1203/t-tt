import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VanBanNghiepVuComponent } from './van-ban-nghiep-vu.component';

const routes: Routes = [{path : '', component : VanBanNghiepVuComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VanBanNghiepVuRoutingModule { }
