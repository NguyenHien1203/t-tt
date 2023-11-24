import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraoDoiThongTinRoutingModule } from './trao-doi-thong-tin-routing.module';
import { ChiTietHopThuComponent } from './chi-tiet-hop-thu/chi-tiet-hop-thu.component';

@NgModule({
    declarations: [ChiTietHopThuComponent],
    imports: [CommonModule, TraoDoiThongTinRoutingModule],
    exports: [ChiTietHopThuComponent],
})
export class TraoDoiThongTinModule {}
