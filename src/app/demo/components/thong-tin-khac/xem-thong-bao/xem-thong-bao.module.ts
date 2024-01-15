import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ChiTietComponent } from './chi-tiet/chi-tiet.component';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

import { ChiTietModule } from './chi-tiet/chi-tiet.module';
import { XemThongBaoRoutingModule } from './xem-thong-bao-routing.module';
import { XemThongBaoComponent } from './xem-thong-bao.component';

@NgModule({
  declarations: [XemThongBaoComponent],
  imports: [
    InputTextareaModule,
    InputTextModule,
    InputMaskModule,
    InputNumberModule,
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
    XemThongBaoRoutingModule,
    ChiTietModule,
  ]
})
export class XemThongBaoModule { }
