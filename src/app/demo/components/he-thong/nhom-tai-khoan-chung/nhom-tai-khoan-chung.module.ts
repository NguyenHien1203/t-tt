import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NhomTaiKhoanChungRoutingModule } from './nhom-tai-khoan-chung-routing.module';
import { NhomTaiKhoanChungComponent } from './nhom-tai-khoan-chung.component';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';
import { ThemNguoiDungComponent } from './them-nguoi-dung/them-nguoi-dung.component';


@NgModule({
  declarations: [
    NhomTaiKhoanChungComponent,
    ThemMoiComponent,
    CapNhatComponent,
    ThemNguoiDungComponent
  ],
  imports: [
    CommonModule,
    NhomTaiKhoanChungRoutingModule
  ]
})
export class NhomTaiKhoanChungModule { }
