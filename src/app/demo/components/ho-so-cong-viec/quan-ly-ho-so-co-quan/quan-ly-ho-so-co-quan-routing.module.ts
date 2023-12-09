import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanLyHoSoCoQuanComponent } from './quan-ly-ho-so-co-quan.component';

const routes: Routes = [{path : '', component : QuanLyHoSoCoQuanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyHoSoCoQuanRoutingModule { }
