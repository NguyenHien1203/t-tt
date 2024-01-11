import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChiTietComponent } from './chi-tiet.component';

@NgModule({
    exports: [ChiTietComponent],
    declarations: [ChiTietComponent],
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
    ],
})
export class ChiTietModule {}
