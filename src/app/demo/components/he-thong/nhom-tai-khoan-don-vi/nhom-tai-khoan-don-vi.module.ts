import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NhomTaiKhoanDonViRoutingModule } from './nhom-tai-khoan-don-vi-routing.module';
import { NhomTaiKhoanDonViComponent } from './nhom-tai-khoan-don-vi.component';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';
import { ThemNguoiDungComponent } from './them-nguoi-dung/them-nguoi-dung.component';


@NgModule({
  declarations: [
    NhomTaiKhoanDonViComponent,
    ThemMoiComponent,
    CapNhatComponent,
    ThemNguoiDungComponent
  ],
  imports: [
    CommonModule,
    NhomTaiKhoanDonViRoutingModule
  ]
})
export class NhomTaiKhoanDonViModule { }
