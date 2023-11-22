import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HopThuQuanTrongComponent } from './hop-thu-quan-trong.component';

const routes: Routes = [{path: '', component : HopThuQuanTrongComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HopThuQuanTrongRoutingModule { }
