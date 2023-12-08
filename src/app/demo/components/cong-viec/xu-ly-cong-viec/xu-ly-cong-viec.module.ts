import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { Select2Module } from 'ng-select2-component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OrganizationChartModule } from 'primeng/organizationchart';

import { XuLyCongViecRoutingModule } from './xu-ly-cong-viec-routing.module';
import { XuLyCongViecComponent } from './xu-ly-cong-viec.component';
import { LuongXuLyComponent } from './luong-xu-ly/luong-xu-ly.component';
import { HoSoComponent } from './ho-so/ho-so.component';
import { BaoCaoComponent } from './bao-cao/bao-cao.component';

@NgModule({
  declarations: [XuLyCongViecComponent, LuongXuLyComponent, HoSoComponent, BaoCaoComponent],
  imports: [
    OrganizationChartModule,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    Select2Module,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    CheckboxModule,
    TableModule,
    ToastModule,
    BreadcrumbModule,
    CommonModule,
    XuLyCongViecRoutingModule
  ]
})
export class XuLyCongViecModule { }