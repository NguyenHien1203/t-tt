import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LichTinhUyRoutingModule } from './lich-tinh-uy-routing.module';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';
import { ThemMoiComponent } from './them-moi/them-moi.component';


@NgModule({
  declarations: [
    CapNhatComponent,
    ThemMoiComponent
  ],
  imports: [
    CommonModule,
    LichTinhUyRoutingModule
  ]
})
export class LichTinhUyModule { }
