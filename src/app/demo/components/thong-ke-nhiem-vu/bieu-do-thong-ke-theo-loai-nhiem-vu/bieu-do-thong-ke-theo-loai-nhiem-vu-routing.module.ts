import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BieuDoThongKeTheoLoaiNhiemVuComponent } from './bieu-do-thong-ke-theo-loai-nhiem-vu.component';

const routes: Routes = [{path :'', component : BieuDoThongKeTheoLoaiNhiemVuComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BieuDoThongKeTheoLoaiNhiemVuRoutingModule { }
