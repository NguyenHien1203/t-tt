import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThongTinKhacRoutingModule } from './thong-tin-khac-routing.module';
import { ChiTietComponent } from './cau-hoi-thuong-gap/chi-tiet/chi-tiet.component';
import { DialogModule } from 'primeng/dialog';
import { Select2Module } from 'ng-select2-component';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ThamDoYKienComponent } from './tham-do-y-kien/tham-do-y-kien.component';

@NgModule({
    declarations: [ChiTietComponent, ThamDoYKienComponent],
    imports: [
        Select2Module,
        CascadeSelectModule,
        TableModule,
        ToastModule,
        BreadcrumbModule,
        DialogModule,
        CommonModule,
        ThongTinKhacRoutingModule,
    ],
    exports: [ChiTietComponent],
})
export class ThongTinKhacModule {}
