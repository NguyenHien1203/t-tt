import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TimKiemTheoSoVanBanComponent } from './tim-kiem-theo-so-van-ban.component';

const routes: Routes = [ {path: '', component: TimKiemTheoSoVanBanComponent} ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimKiemTheoSoVanBanRoutingModule { }
