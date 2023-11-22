import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NhanCaNhanComponent } from './nhan-ca-nhan.component';

const routes: Routes = [{path: '', component : NhanCaNhanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NhanCaNhanRoutingModule { }
