import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonViRoutingModule } from './don-vi-routing.module';
import { DonViComponent } from './don-vi.component';


@NgModule({
  declarations: [DonViComponent],
  imports: [
    CommonModule,
    DonViRoutingModule
  ]
})
export class DonViModule { }
