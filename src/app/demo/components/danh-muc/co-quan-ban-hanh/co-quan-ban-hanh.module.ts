import { CoQuanBanHanhComponent } from './co-quan-ban-hanh.component';
import { CoQuanBanHanhRoutingModule } from './co-quan-ban-hanh-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormLayoutDemoRoutingModule } from '../../uikit/formlayout/formlayoutdemo-routing.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ThemMoiCoQuanBanHanhComponent } from './them-moi-co-quan-ban-hanh/them-moi-co-quan-ban-hanh.component';
import { CapNhatCoQuanBanHanhComponent } from './cap-nhat-co-quan-ban-hanh/cap-nhat-co-quan-ban-hanh.component';


@NgModule({
  declarations: [CoQuanBanHanhComponent, ThemMoiCoQuanBanHanhComponent, CapNhatCoQuanBanHanhComponent],
  imports: [
    CommonModule,
    CoQuanBanHanhRoutingModule,
    ConfirmDialogModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    DialogModule,
    ToolbarModule,
    TableModule,
    BreadcrumbModule,
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
    InputTextModule
  ]
})
export class CoQuanBanHanhModule { }
