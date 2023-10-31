import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhMucRoutingModule } from './danh-muc-routing.module';
import { LienKetComponent } from './lien-ket/lien-ket.component';
import { DonViComponent } from './don-vi/don-vi.component';

@NgModule({
  imports: [
    CommonModule,
    DanhMucRoutingModule
  ],
  declarations: [
    DonViComponent
  ]
})
export class DanhMucModule { }
