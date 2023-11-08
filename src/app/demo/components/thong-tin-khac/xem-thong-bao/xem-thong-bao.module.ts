import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XemThongBaoRoutingModule } from './xem-thong-bao-routing.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { XemThongBaoComponent } from './xem-thong-bao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ChiTietComponent } from './chi-tiet/chi-tiet.component';


@NgModule({
  declarations: [XemThongBaoComponent, ChiTietComponent],
  imports: [
    ReactiveFormsModule,
    DialogModule,
    ToastModule,
    FormsModule,
    TableModule,
    CheckboxModule,
    CalendarModule,
    DropdownModule,
    BreadcrumbModule,
    CommonModule,
    XemThongBaoRoutingModule
  ]
})
export class XemThongBaoModule { }
