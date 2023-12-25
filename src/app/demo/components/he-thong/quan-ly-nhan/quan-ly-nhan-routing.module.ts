import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanLyNhanComponent } from './quan-ly-nhan.component';

const routes: Routes = [{path : '', component : QuanLyNhanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyNhanRoutingModule { }
