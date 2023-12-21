import { BieuDoThongKeTheoLinhVucComponent } from './bieu-do-thong-ke-theo-linh-vuc.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path :'', component : BieuDoThongKeTheoLinhVucComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BieuDoThongKeTheoLinhVucRoutingModule { }
