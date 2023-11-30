import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CauHoiThuongGapComponent } from './cau-hoi-thuong-gap.component';

const routes: Routes = [{path: '', component : CauHoiThuongGapComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CauHoiThuongGapRoutingModule { }
