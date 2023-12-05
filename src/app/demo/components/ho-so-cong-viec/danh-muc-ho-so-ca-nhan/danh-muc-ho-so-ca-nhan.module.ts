import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DanhMucHoSoCaNhanRoutingModule } from './danh-muc-ho-so-ca-nhan-routing.module';
import { DanhMucHoSoCaNhanComponent } from './danh-muc-ho-so-ca-nhan.component';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';


@NgModule({
  declarations: [
    DanhMucHoSoCaNhanComponent,
    ThemMoiComponent,
    CapNhatComponent
  ],
  imports: [
    CommonModule,
    DanhMucHoSoCaNhanRoutingModule
  ]
})
export class DanhMucHoSoCaNhanModule { }
