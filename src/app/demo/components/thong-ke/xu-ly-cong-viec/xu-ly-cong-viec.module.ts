import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XuLyCongViecRoutingModule } from './xu-ly-cong-viec-routing.module';
import { XuLyCongViecComponent } from './xu-ly-cong-viec.component';


@NgModule({
  declarations: [
    XuLyCongViecComponent
  ],
  imports: [
    CommonModule,
    XuLyCongViecRoutingModule
  ]
})
export class XuLyCongViecModule { }
