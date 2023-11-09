import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TinhChatNhiemVuRoutingModule } from './tinh-chat-nhiem-vu-routing.module';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';


@NgModule({
  declarations: [
    ThemMoiComponent,
    CapNhatComponent
  ],
  imports: [
    CommonModule,
    TinhChatNhiemVuRoutingModule
  ]
})
export class TinhChatNhiemVuModule { }
