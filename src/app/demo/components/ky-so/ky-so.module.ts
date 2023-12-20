import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KySoRoutingModule } from './ky-so-routing.module';
import { DuyetVanBanTrinhKyComponent } from './duyet-van-ban-trinh-ky/duyet-van-ban-trinh-ky.component';
import { VanBanKySoDaDuyetComponent } from './van-ban-ky-so-da-duyet/van-ban-ky-so-da-duyet.component';
import { VanBanChoKySoComponent } from './van-ban-cho-ky-so/van-ban-cho-ky-so.component';
import { VanBanKySoDaKyComponent } from './van-ban-ky-so-da-ky/van-ban-ky-so-da-ky.component';
import { VanBanChoPhatHanhComponent } from './van-ban-cho-phat-hanh/van-ban-cho-phat-hanh.component';
import { VanBanKyChoPhatHanhComponent } from './van-ban-ky-cho-phat-hanh/van-ban-ky-cho-phat-hanh.component';

@NgModule({
  declarations: [
  
    DuyetVanBanTrinhKyComponent,
       VanBanKySoDaDuyetComponent,
       VanBanChoKySoComponent,
       VanBanKySoDaKyComponent,
       VanBanChoPhatHanhComponent,
       VanBanKyChoPhatHanhComponent
  ],
  imports: [
    CommonModule,
    KySoRoutingModule
  ]
})
export class KySoModule { }
