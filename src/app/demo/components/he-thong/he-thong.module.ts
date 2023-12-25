import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeThongRoutingModule } from './he-thong-routing.module';
import { QuanLyNhanComponent } from './quan-ly-nhan/quan-ly-nhan.component';
import { ThemMoiComponent } from './quan-ly-nhan/them-moi/them-moi.component';
import { CapNhatComponent } from './quan-ly-nhan/cap-nhat/cap-nhat.component';

@NgModule({
    declarations: [
  ],
    imports: [CommonModule, HeThongRoutingModule],
})
export class HeThongModule {}
