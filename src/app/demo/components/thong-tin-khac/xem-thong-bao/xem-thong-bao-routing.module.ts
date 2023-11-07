import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XemThongBaoComponent } from './xem-thong-bao.component';

const routes: Routes = [{path : '', component : XemThongBaoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XemThongBaoRoutingModule { }
