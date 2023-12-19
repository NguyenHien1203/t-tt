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
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

import { QuanLyDatLaiMatKhauRoutingModule } from './quan-ly-dat-lai-mat-khau-routing.module';
import { QuanLyDatLaiMatKhauComponent } from './quan-ly-dat-lai-mat-khau.component';
import { XuLyComponent } from './xu-ly/xu-ly.component';
import { RadioButtonModule } from 'primeng/radiobutton';


@NgModule({
  declarations: [
    QuanLyDatLaiMatKhauComponent,
    XuLyComponent
  ],
  imports: [
    RadioButtonModule,
    ConfirmDialogModule,
    FileUploadModule,
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
    QuanLyDatLaiMatKhauRoutingModule
  ]
})
export class QuanLyDatLaiMatKhauModule { }
