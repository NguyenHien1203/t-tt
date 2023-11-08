import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanLyBangLuongComponent } from './quan-ly-bang-luong.component';

const routes: Routes = [{path : '', component : QuanLyBangLuongComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyBangLuongRoutingModule { }
