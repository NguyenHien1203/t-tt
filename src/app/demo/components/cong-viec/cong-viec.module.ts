import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CongViecRoutingModule } from './cong-viec-routing.module';
import { DuyetBanGiaoCongViecComponent } from './duyet-ban-giao-cong-viec/duyet-ban-giao-cong-viec.component';


@NgModule({
  declarations: [
  
    DuyetBanGiaoCongViecComponent
  ],
  imports: [
    CommonModule, CongViecRoutingModule
  ]
})
export class CongViecModule { }
