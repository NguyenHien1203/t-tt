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

import { TheoDoiVanBanDiRoutingModule } from './theo-doi-van-ban-di-routing.module';
import { TheoDoiVanBanDiComponent } from './theo-doi-van-ban-di.component';
import { BaoCaoComponent } from './bao-cao/bao-cao.component';
import { TheoDoiComponent } from './theo-doi/theo-doi.component';
import { TooltipModule } from 'primeng/tooltip';
import { CapNhatKetQuaComponent } from './bao-cao/cap-nhat-ket-qua/cap-nhat-ket-qua.component';
import { GuiCanhBaoComponent } from './bao-cao/gui-canh-bao/gui-canh-bao.component';
import { ChiTietVanBanModule } from '../../chi-tiet-van-ban/chi-tiet-van-ban.module';


@NgModule({
  declarations: [
    TheoDoiVanBanDiComponent,
    BaoCaoComponent,
    TheoDoiComponent,
    CapNhatKetQuaComponent,
    GuiCanhBaoComponent
  ],
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
    ChiTietVanBanModule,
    TheoDoiVanBanDiRoutingModule
  ]
})
export class TheoDoiVanBanDiModule { }
