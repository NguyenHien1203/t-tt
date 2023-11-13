import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoaiVanBanDiComponent } from './loai-van-ban-di.component';

const routes: Routes = [{path: '', component: LoaiVanBanDiComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoaiVanBanDiRoutingModule { }
