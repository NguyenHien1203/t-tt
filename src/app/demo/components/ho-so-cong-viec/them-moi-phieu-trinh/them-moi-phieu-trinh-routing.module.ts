import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemMoiPhieuTrinhComponent } from './them-moi-phieu-trinh.component';

const routes: Routes = [{path : '', component : ThemMoiPhieuTrinhComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemMoiPhieuTrinhRoutingModule { }
