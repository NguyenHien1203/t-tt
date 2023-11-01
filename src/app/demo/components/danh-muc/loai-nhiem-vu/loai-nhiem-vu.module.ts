import { LoaiNhiemVuRoutingModule } from './loai-nhiem-vu-routing.module';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FormLayoutDemoRoutingModule } from '../../uikit/formlayout/formlayoutdemo-routing.module';
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
import { LoaiNhiemVuComponent } from './loai-nhiem-vu.component';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {  ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [LoaiNhiemVuComponent, ThemMoiComponent, CapNhatComponent, ],
  imports: [
    ConfirmDialogModule,
    PaginatorModule,
    CommonModule,
    LoaiNhiemVuRoutingModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    DialogModule,
    ToolbarModule,
    TableModule,
    BreadcrumbModule,
    FormsModule,
    FormLayoutDemoRoutingModule,
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
  ]
})
export class LoaiNhiemVuModule { }
