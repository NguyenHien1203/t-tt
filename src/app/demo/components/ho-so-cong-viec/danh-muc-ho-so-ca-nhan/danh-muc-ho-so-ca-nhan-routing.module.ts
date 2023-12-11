import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhMucHoSoCaNhanComponent } from './danh-muc-ho-so-ca-nhan.component';

const routes: Routes = [{path : '', component : DanhMucHoSoCaNhanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhMucHoSoCaNhanRoutingModule { }
