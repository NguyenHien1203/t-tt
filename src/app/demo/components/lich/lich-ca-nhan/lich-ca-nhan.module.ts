import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
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

import { LichCaNhanRoutingModule } from './lich-ca-nhan-routing.module';
import { LichCaNhanComponent } from './lich-ca-nhan.component';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';

@NgModule({
    declarations: [LichCaNhanComponent, ThemMoiComponent, CapNhatComponent],
    imports: [
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
        LichCaNhanRoutingModule,
    ],
})
export class LichCaNhanModule {}
