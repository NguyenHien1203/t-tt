import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaiKhoanRoutingModule } from './tai-khoan-routing.module';
import { TaiKhoanComponent } from './tai-khoan.component';
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
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { ThemDvThucHienComponent } from './them-moi/them-dv-thuc-hien.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';
import { CapNhatDvThucHienComponent } from './cap-nhat/cap-nhat-dv-thuc-hien.component';
@NgModule({
  imports: [
    CommonModule,
    TaiKhoanRoutingModule,
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
    ReactiveFormsModule,
    BreadcrumbModule,
    TreeModule,
    TreeSelectModule,
    ConfirmDialogModule
  ],
  declarations: [TaiKhoanComponent, ThemMoiComponent, ThemDvThucHienComponent, CapNhatComponent, CapNhatDvThucHienComponent]
})
export class TaiKhoanModule { }
