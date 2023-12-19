import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LuongKySoRoutingModule } from './luong-ky-so-routing.module';
import { LuongKySoComponent } from './luong-ky-so.component';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { ChiTietComponent } from './chi-tiet/chi-tiet.component';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';

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

// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatTableModule } from '@angular/material/table';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    LuongKySoComponent,
    ThemMoiComponent,
    ChiTietComponent,
    CapNhatComponent,
  ],
  imports: [
    CommonModule,
    LuongKySoRoutingModule,

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

    // BrowserModule,
    // BrowserAnimationsModule,
    // MatTableModule,
    // MatInputModule,
    // MatButtonModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // FormsModule,
    // MatCheckboxModule,
    // MatDialogModule,
  ]
})
export class LuongKySoModule { }
