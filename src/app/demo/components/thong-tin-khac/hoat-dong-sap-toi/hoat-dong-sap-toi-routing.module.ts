import { HoatDongSapToiComponent } from './hoat-dong-sap-toi.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path: '', component: HoatDongSapToiComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoatDongSapToiRoutingModule { }
