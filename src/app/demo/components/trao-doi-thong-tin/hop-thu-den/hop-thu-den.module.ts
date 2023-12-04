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
import { MenubarModule } from 'primeng/menubar';

import { HopThuDenRoutingModule } from './hop-thu-den-routing.module';
import { HopThuDenComponent } from './hop-thu-den.component';
import { HopThuDiModule } from '../hop-thu-di/hop-thu-di.module';
import { TraoDoiThongTinModule } from '../trao-doi-thong-tin.module';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
    declarations: [HopThuDenComponent],
    imports: [
        OverlayPanelModule,
        TieredMenuModule,
        TraoDoiThongTinModule,
        MenubarModule,
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
        HopThuDenRoutingModule,
    ],
})
export class HopThuDenModule {}
