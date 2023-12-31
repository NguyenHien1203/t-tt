import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LienKetRoutingModule } from './lien-ket-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { LienKetComponent } from './lien-ket.component';
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
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [LienKetComponent, ThemMoiComponent, CapNhatComponent],
  imports: [
    ConfirmDialogModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    DialogModule,
    ToolbarModule,
    TableModule,
    BreadcrumbModule,
    CommonModule,
    LienKetRoutingModule,
    CommonModule,
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
export class LienKetModule { }
