import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhMucRoutingModule } from './danh-muc-routing.module';
import { LienKetComponent } from './lien-ket/lien-ket.component';
import { DonViComponent } from './don-vi/don-vi.component';
import { LoaiHoSoComponent } from './loai-ho-so/loai-ho-so.component';

@NgModule({
  imports: [
    CommonModule,
    DanhMucRoutingModule
  ],
  declarations: [
    DonViComponent,
    LoaiHoSoComponent
  ]
})
export class DanhMucModule { }
