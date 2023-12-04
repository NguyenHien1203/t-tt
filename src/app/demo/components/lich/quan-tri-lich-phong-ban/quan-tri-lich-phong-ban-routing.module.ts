import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanTriLichPhongBanComponent } from './quan-tri-lich-phong-ban.component';

const routes: Routes = [{path : '', component : QuanTriLichPhongBanComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanTriLichPhongBanRoutingModule { }
