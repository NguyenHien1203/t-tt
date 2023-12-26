import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NhomTaiKhoanDonViComponent } from './nhom-tai-khoan-don-vi.component';

const routes: Routes = [{path : '', component : NhomTaiKhoanDonViComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NhomTaiKhoanDonViRoutingModule { }
