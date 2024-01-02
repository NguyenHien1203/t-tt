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
import { TabPanel, TabViewModule } from 'primeng/tabview';

import { TraCuuNangCaoRoutingModule } from './tra-cuu-nang-cao-routing.module';
import { TraCuuNangCaoComponent } from './tra-cuu-nang-cao.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { ChiTietVanBanModule } from '../../chi-tiet-van-ban/chi-tiet-van-ban.module';

@NgModule({
    declarations: [TraCuuNangCaoComponent],
    imports: [
      TabMenuModule,
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
        TraCuuNangCaoRoutingModule,
    ],
})
export class TraCuuNangCaoModule {}
