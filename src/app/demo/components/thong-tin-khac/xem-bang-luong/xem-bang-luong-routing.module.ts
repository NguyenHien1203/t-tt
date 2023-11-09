import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XemBangLuongComponent } from './xem-bang-luong.component';

const routes: Routes = [{path : '', component : XemBangLuongComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XemBangLuongRoutingModule { }
