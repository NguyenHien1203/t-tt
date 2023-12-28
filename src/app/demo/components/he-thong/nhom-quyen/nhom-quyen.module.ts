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

import { NhomQuyenRoutingModule } from './nhom-quyen-routing.module';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';
import { NhomQuyenComponent } from './nhom-quyen.component';
import { GanQuyenComponent } from './gan-quyen/gan-quyen.component';
import { TreeNodeComponent } from './gan-quyen/tree-node/tree-node.component';

@NgModule({
    declarations: [
        GanQuyenComponent,
        TreeNodeComponent,
        ThemMoiComponent,
        CapNhatComponent,
        NhomQuyenComponent,
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
        NhomQuyenRoutingModule,
    ],
})
export class NhomQuyenModule {}
