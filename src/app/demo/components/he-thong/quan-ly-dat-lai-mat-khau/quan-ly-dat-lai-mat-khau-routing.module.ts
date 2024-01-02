import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanLyDatLaiMatKhauComponent } from './quan-ly-dat-lai-mat-khau.component';

const routes: Routes = [{path : '', component : QuanLyDatLaiMatKhauComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyDatLaiMatKhauRoutingModule { }
