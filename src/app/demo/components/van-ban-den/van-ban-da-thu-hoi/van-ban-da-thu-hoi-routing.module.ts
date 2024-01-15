import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VanBanDaThuHoiComponent } from './van-ban-da-thu-hoi.component';


const routes: Routes = [ {path: '', component: VanBanDaThuHoiComponent} ];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VanBanDaThuHoiRoutingModule { }
