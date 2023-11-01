import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanLyThongBaoComponent } from './quan-ly-thong-bao.component';

const routes: Routes = [{path : '', component : QuanLyThongBaoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyThongBaoRoutingModule { }
