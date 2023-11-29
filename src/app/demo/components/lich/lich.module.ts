import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LichRoutingModule } from './lich-routing.module';
import { QuanTriLichComponent } from './quan-tri-lich/quan-tri-lich.component';
import { ThemMoiComponent } from './quan-tri-lich/them-moi/them-moi.component';
import { CapNhatComponent } from './quan-tri-lich/cap-nhat/cap-nhat.component';

@NgModule({
    declarations: [],
    imports: [CommonModule, LichRoutingModule],
})
export class LichModule {}
