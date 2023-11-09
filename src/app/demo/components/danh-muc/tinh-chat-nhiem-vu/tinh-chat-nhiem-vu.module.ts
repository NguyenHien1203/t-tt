import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TinhChatNhiemVuRoutingModule } from './tinh-chat-nhiem-vu-routing.module';
import { ThemMoiComponent } from './them-moi/them-moi.component';
import { CapNhatComponent } from './cap-nhat/cap-nhat.component';
import { TinhChatNhiemVuComponent } from './tinh-chat-nhiem-vu.component';

import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
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
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';


@NgModule({
  declarations: [
    ThemMoiComponent,
    CapNhatComponent,
    TinhChatNhiemVuComponent
  ],
  imports: [
    CommonModule,
    TinhChatNhiemVuRoutingModule,
    BreadcrumbModule,
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
    CheckboxModule,
    ReactiveFormsModule,
    TreeModule,
    TreeSelectModule
  ]
})
export class TinhChatNhiemVuModule { }
