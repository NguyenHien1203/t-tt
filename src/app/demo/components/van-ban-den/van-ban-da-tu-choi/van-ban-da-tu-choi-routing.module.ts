import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VanBanDaTuChoiComponent } from './van-ban-da-tu-choi.component';


const routes: Routes = [ {path: '', component: VanBanDaTuChoiComponent} ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VanBanDaTuChoiRoutingModule { }
