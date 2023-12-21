import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BieuDoThongKeTheoTieuChiComponent } from './bieu-do-thong-ke-theo-tieu-chi.component';

const routes: Routes = [{path : '', component : BieuDoThongKeTheoTieuChiComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BieuDoThongKeTheoTieuChiRoutingModule { }
