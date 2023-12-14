import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuyetPhieuTrinhComponent } from './duyet-phieu-trinh.component';

const routes: Routes = [{path : '', component : DuyetPhieuTrinhComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuyetPhieuTrinhRoutingModule { }
