import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { QuanTriVanBanRoutingModule } from './quan-tri-van-ban-routing.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TabViewModule } from 'primeng/tabview';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { QuanTriVanBanComponent } from './quan-tri-van-ban.component';
import { TiepNhanVanBanComponent } from './tiep-nhan-van-ban/tiep-nhan-van-ban.component';
import { SuaVanBanComponent } from './sua-van-ban/sua-van-ban.component';
import { TuChoiComponent } from './tu-choi/tu-choi.component';
import { PhanPhoiComponent } from './phan-phoi/phan-phoi.component';
import { saveAs } from 'file-saver';
import { ChiTietVanBanModule } from '../../chi-tiet-van-ban/chi-tiet-van-ban.module';

@NgModule({
  declarations: [QuanTriVanBanComponent, TiepNhanVanBanComponent,SuaVanBanComponent, TuChoiComponent, PhanPhoiComponent],
  imports: [
    FileUploadModule,
    RadioButtonModule,
    TreeSelectModule,
    OverlayPanelModule,
    TabViewModule,
    TreeModule,
    RatingModule,
    RippleModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    CheckboxModule,
    DialogModule,
    ToolbarModule,
    TableModule,
    BreadcrumbModule,
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
    CommonModule,
    QuanTriVanBanRoutingModule,
    ChiTietVanBanModule
  ]
})
export class QuanTriVanBanModule { }
