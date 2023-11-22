import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HopThuDiComponent } from './hop-thu-di.component';

const routes: Routes = [{path: '', component : HopThuDiComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HopThuDiRoutingModule { }
