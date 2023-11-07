import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonViRoutingModule } from './don-vi-routing.module';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { DonViComponent } from './don-vi.component';
import { ThemMoiDonViComponent } from './them-moi-don-vi/them-moi-don-vi.component';
import { CapNhatDonViComponent } from './cap-nhat-don-vi/cap-nhat-don-vi.component';
import { CalendarModule } from "primeng/calendar";
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [DonViComponent, ThemMoiDonViComponent, CapNhatDonViComponent],
  imports: [
    CommonModule,
    DonViRoutingModule,
    BreadcrumbModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    CheckboxModule,
    ReactiveFormsModule,
    TreeModule,
    TreeSelectModule,
    CalendarModule,
    ConfirmDialogModule
  ]
})
export class DonViModule { }
