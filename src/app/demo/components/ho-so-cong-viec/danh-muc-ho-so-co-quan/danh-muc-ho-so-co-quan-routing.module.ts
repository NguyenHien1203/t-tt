import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DanhMucHoSoCoQuanComponent } from './danh-muc-ho-so-co-quan.component';

const routes: Routes = [{path : '', component : DanhMucHoSoCoQuanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhMucHoSoCoQuanRoutingModule { }
