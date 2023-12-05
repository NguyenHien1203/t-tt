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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';

import { LichTinhUyRoutingModule } from './lich-tinh-uy-routing.module';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { LichTinhUyComponent } from './lich-tinh-uy.component';


@NgModule({
  declarations: [
    LichTinhUyComponent,
    CapNhatComponent,
    ThemMoiComponent
  ],
  imports: [
    TooltipModule,
        ChipModule,
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
    LichTinhUyRoutingModule
  ]
})
export class LichTinhUyModule { }
