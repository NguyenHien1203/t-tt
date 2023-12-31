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
import { TooltipModule } from 'primeng/tooltip';

import { QuanLyHoSoCoQuanRoutingModule } from './quan-ly-ho-so-co-quan-routing.module';
import { QuanLyHoSoCoQuanComponent } from './quan-ly-ho-so-co-quan.component';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { ChonVanBanComponent } from './chon-van-ban/chon-van-ban.component';
import { ChonCongViecComponent } from './chon-cong-viec/chon-cong-viec.component';
import { ChonPhieuTrinhComponent } from './chon-phieu-trinh/chon-phieu-trinh.component';
import { ChiTietHoSoCongViecModule } from '../chi-tiet-ho-so-cong-viec/chi-tiet-ho-so-cong-viec.module';


@NgModule({
  declarations: [QuanLyHoSoCoQuanComponent, CapNhatComponent, ThemMoiComponent, ChonVanBanComponent, ChonCongViecComponent, ChonPhieuTrinhComponent],
  imports: [
    TooltipModule,
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
    ChiTietHoSoCongViecModule,
    QuanLyHoSoCoQuanRoutingModule
  ]
})
export class QuanLyHoSoCoQuanModule { }
