import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThayDoiThongTinComponent } from './thay-doi-thong-tin.component';

const routes: Routes = [{path : '', component : ThayDoiThongTinComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThayDoiThongTinRoutingModule { }
