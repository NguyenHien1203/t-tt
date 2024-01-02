import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DuyetHoanThanhComponent } from './duyet-hoan-thanh.component';

const routes: Routes = [{path: '', component:DuyetHoanThanhComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DuyetHoanThanhRoutingModule { }
