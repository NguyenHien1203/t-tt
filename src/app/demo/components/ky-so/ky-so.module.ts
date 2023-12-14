import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KySoRoutingModule } from './ky-so-routing.module';
import { TrinhKyVanBanComponent } from './trinh-ky-van-ban/trinh-ky-van-ban.component';


@NgModule({
  declarations: [
    TrinhKyVanBanComponent
  ],
  imports: [
    CommonModule,
    KySoRoutingModule
  ]
})
export class KySoModule { }
