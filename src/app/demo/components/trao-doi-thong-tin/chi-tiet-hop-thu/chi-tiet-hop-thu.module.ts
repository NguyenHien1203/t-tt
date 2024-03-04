import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChiTietHopThuComponent } from './chi-tiet-hop-thu.component';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
    exports: [ChiTietHopThuComponent],
    declarations: [ChiTietHopThuComponent],
    imports: [
        AvatarModule,
        InputTextareaModule,
        InputTextModule,
        ReactiveFormsModule,
        DialogModule,
        ToastModule,
        FormsModule,
        TableModule,
        CommonModule,
    ],
})
export class ChiTietHopThuModule {}
