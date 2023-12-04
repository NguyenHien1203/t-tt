import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { Select2Module } from 'ng-select2-component';
import { DialogModule } from 'primeng/dialog';
import { ChipModule } from 'primeng/chip';

import { CauHoiThuongGapRoutingModule } from './cau-hoi-thuong-gap-routing.module';

import { CauHoiThuongGapComponent } from './cau-hoi-thuong-gap.component';
import { ThongTinKhacModule } from '../thong-tin-khac.module';


@NgModule({
  declarations: [CauHoiThuongGapComponent],
  imports: [
    ThongTinKhacModule,
    ChipModule,
    DialogModule,
    FormsModule,
    Select2Module,
    AutoCompleteModule,
    CalendarModule,
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
    CauHoiThuongGapRoutingModule
  ]
})
export class CauHoiThuongGapModule { }
