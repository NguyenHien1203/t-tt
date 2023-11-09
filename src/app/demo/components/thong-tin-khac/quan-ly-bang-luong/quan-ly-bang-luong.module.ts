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
import { QuanLyBangLuongRoutingModule } from './quan-ly-bang-luong-routing.module';
import { DialogModule } from 'primeng/dialog';
import { QuanLyBangLuongComponent } from './quan-ly-bang-luong.component';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';


@NgModule({
  declarations: [QuanLyBangLuongComponent, ThemMoiComponent, CapNhatComponent],
  imports: [
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
    QuanLyBangLuongRoutingModule
  ]
})
export class QuanLyBangLuongModule { }
