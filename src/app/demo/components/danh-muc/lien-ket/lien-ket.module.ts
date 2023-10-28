import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LienKetRoutingModule } from './lien-ket-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { LienKetComponent } from './lien-ket.component';
import { FormsModule } from '@angular/forms';
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



@NgModule({
  declarations: [LienKetComponent],
  imports: [
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
