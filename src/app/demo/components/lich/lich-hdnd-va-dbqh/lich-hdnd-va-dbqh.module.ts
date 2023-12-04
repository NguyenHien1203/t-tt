import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LichHdndVaDbqhRoutingModule } from './lich-hdnd-va-dbqh-routing.module';
import { LichHdndVaDbqhComponent } from './lich-hdnd-va-dbqh.component';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';


@NgModule({
  declarations: [
    LichHdndVaDbqhComponent,
    ThemMoiComponent,
    CapNhatComponent
  ],
  imports: [
    CommonModule,
    LichHdndVaDbqhRoutingModule
  ]
})
export class LichHdndVaDbqhModule { }
