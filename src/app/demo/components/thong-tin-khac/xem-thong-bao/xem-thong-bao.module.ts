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
import { InputDemoModule } from '../../uikit/input/inputdemo.module';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [XemThongBaoComponent, ChiTietComponent],
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
    XemThongBaoRoutingModule
  ]
})
export class XemThongBaoModule { }
