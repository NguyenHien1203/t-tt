import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaiLieuHuongDanComponent } from './tai-lieu-huong-dan.component';

const routes: Routes = [{ path: '', component: TaiLieuHuongDanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaiLieuHuongDanRoutingModule { }
