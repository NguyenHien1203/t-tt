import { KyPhieuTrinhComponent } from './ky-phieu-trinh.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path : '', component :  KyPhieuTrinhComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KyPhieuTrinhRoutingModule { }
