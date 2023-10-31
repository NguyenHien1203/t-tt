import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoaiNhiemVuComponent } from './loai-nhiem-vu.component';

const routes: Routes = [{path : '' , component : LoaiNhiemVuComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoaiNhiemVuRoutingModule { }
