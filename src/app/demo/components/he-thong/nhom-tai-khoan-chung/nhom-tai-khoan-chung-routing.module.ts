import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NhomTaiKhoanChungComponent } from './nhom-tai-khoan-chung.component';

const routes: Routes = [{path : '', component : NhomTaiKhoanChungComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NhomTaiKhoanChungRoutingModule { }
