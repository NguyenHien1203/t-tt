import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoaiVanBanComponent } from './loai-van-ban.component';

const routes: Routes = [{ path: '', component: LoaiVanBanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoaiVanBanRoutingModule { }
