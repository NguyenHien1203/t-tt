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
import { ChiTietVanBanComponent } from './chi-tiet-van-ban/chi-tiet-van-ban.component';
import { GuiVanBanComponent } from './gui-van-ban/gui-van-ban.component';
import { CapNhatVanBanComponent } from './cap-nhat-van-ban/cap-nhat-van-ban.component';


@NgModule({
  declarations: [
    QuanTriVanBanDiComponent,
    ChiTietVanBanComponent,
    GuiVanBanComponent,
    CapNhatVanBanComponent
  ],
  imports: [
    CommonModule,
    QuanTriVanBanDiRoutingModule,

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
    OverlayPanelModule,
  ]
})
export class QuanTriVanBanDiModule { }
