import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanLyCauHoiThuongGapComponent } from './quan-ly-cau-hoi-thuong-gap.component';

const routes: Routes = [{path : '', component : QuanLyCauHoiThuongGapComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyCauHoiThuongGapRoutingModule { }
