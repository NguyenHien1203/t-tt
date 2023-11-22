import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HopThuDenComponent } from './hop-thu-den.component';

const routes: Routes = [{path: '', component : HopThuDenComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HopThuDenRoutingModule { }
