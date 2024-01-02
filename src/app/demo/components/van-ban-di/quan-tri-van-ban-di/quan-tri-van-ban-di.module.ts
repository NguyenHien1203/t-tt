import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanTriVanBanDiRoutingModule } from './quan-tri-van-ban-di-routing.module';
import { QuanTriVanBanDiComponent } from './quan-tri-van-ban-di.component';

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
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { GuiVanBanComponent } from './gui-van-ban/gui-van-ban.component';
import { CapNhatVanBanComponent } from './cap-nhat-van-ban/cap-nhat-van-ban.component';
import { ChiTietVanBanModule } from '../../chi-tiet-van-ban/chi-tiet-van-ban.module';
import { PhanPhoiComponent } from './phan-phoi/phan-phoi.component';
import { TreeNodeComponent } from './tree-node/tree-node.component';
import { ChonVanBanComponent } from './gui-van-ban/chon-van-ban/chon-van-ban.component';
import { ThuHoiComponent } from './thu-hoi/thu-hoi.component';
import { LayLaiComponent } from './lay-lai/lay-lai.component';
import { ThayTheComponent } from './thay-the/thay-the.component';
import { CapNhatVanBanDaGuiComponent } from './cap-nhat-van-ban-da-gui/cap-nhat-van-ban-da-gui.component';


@NgModule({
  declarations: [
    QuanTriVanBanDiComponent,
    GuiVanBanComponent,
    CapNhatVanBanComponent,
    PhanPhoiComponent,
    TreeNodeComponent,
    ChonVanBanComponent,
    ThuHoiComponent,
    LayLaiComponent,
    ThayTheComponent,
    CapNhatVanBanDaGuiComponent
  ],
  imports: [
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
    ChiTietVanBanModule,
    OverlayPanelModule,
    QuanTriVanBanDiRoutingModule
  ]
})
export class QuanTriVanBanDiModule { }
