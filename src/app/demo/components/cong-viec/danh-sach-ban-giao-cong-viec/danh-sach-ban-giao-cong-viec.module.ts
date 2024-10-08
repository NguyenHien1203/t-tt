import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { DanhSachBanGiaoCongViecComponent } from './danh-sach-ban-giao-cong-viec.component';
import { DanhSachBanGiaoCongViecRoutingModule } from './danh-sach-ban-giao-cong-viec-routing.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { ThemMoiBanGiaoCongViecComponent } from './them-moi-ban-giao-cong-viec/them-moi-ban-giao-cong-viec.component';
import { CapNhatBanGiaoCongViecComponent } from './cap-nhat-ban-giao-cong-viec/cap-nhat-ban-giao-cong-viec.component';
import { BanGiaoCongViecComponent } from './ban-giao-cong-viec/ban-giao-cong-viec.component';
import { HoSoCongViecCaNhanComponent } from './ban-giao-cong-viec/ho-so-cong-viec-ca-nhan/ho-so-cong-viec-ca-nhan.component';

@NgModule({
    declarations: [
        DanhSachBanGiaoCongViecComponent,
        ThemMoiBanGiaoCongViecComponent,
        CapNhatBanGiaoCongViecComponent,
        BanGiaoCongViecComponent,
        HoSoCongViecCaNhanComponent,
    ],
    imports: [
        MultiSelectModule,
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
        ConfirmDialogModule,
        CheckboxModule,
        CalendarModule,
        TabViewModule,
        CommonModule,
        DanhSachBanGiaoCongViecRoutingModule,
    ],
})
export class DanhSachBanGiaoCongViecModule {}
