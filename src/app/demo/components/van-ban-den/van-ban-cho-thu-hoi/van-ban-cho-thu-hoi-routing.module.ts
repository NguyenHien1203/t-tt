import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VanBanChoThuHoiComponent } from './van-ban-cho-thu-hoi.component';

const routes: Routes = [ {path: '', component: VanBanChoThuHoiComponent} ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VanBanChoThuHoiRoutingModule { }
