import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanLyTaiLieuHuongDanComponent } from './quan-ly-tai-lieu-huong-dan.component';

const routes: Routes = [{ path: '', component: QuanLyTaiLieuHuongDanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyTaiLieuHuongDanRoutingModule { }
