import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraoDoiThongTinRoutingModule } from './trao-doi-thong-tin-routing.module';
import { ChiTietHopThuComponent } from './chi-tiet-hop-thu/chi-tiet-hop-thu.component';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
    declarations: [ChiTietHopThuComponent],
    imports: [
        InputTextareaModule,
        InputTextModule,
        ReactiveFormsModule,
        DialogModule,
        ToastModule,
        FormsModule,
        TableModule,
        CommonModule,
        TraoDoiThongTinRoutingModule,
    ],
    exports: [ChiTietHopThuComponent],
})
export class TraoDoiThongTinModule {}
