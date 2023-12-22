import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BieuDoThongKeTheoBangComponent } from './bieu-do-thong-ke-theo-bang.component';

const routes: Routes = [{path :'', component : BieuDoThongKeTheoBangComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BieuDoThongKeTheoBangRoutingModule { }
