import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NhomTaiKhoanCaNhanRoutingModule } from './nhom-tai-khoan-ca-nhan-routing.module';
import { ThemNguoiDungComponent } from './them-nguoi-dung/them-nguoi-dung.component';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';


@NgModule({
  declarations: [
    ThemNguoiDungComponent,
    ThemMoiComponent,
    CapNhatComponent
  ],
  imports: [
    CommonModule,
    NhomTaiKhoanCaNhanRoutingModule
  ]
})
export class NhomTaiKhoanCaNhanModule { }
