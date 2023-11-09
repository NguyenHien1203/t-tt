import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhMucRoutingModule } from './danh-muc-routing.module';
import { TinhChatNhiemVuComponent } from './tinh-chat-nhiem-vu/tinh-chat-nhiem-vu.component';

@NgModule({
  imports: [
    CommonModule,
    DanhMucRoutingModule
  ],
  declarations: [
  
    TinhChatNhiemVuComponent
  ]
})
export class DanhMucModule { }
