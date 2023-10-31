import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhongBanRoutingModule } from './phong-ban-routing.module';
import { PhongBanComponent } from './phong-ban.component';
import { FormsModule } from '@angular/forms';
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
import { BreadcrumbModule } from 'primeng/breadcrumb';
// import { DropdownSearchComponent } from './hello.component';
// import { SearchDropdown } from './search-dropdown/search-dropdown';
@NgModule({
  imports: [
    CommonModule,
    PhongBanRoutingModule,
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
    BreadcrumbModule
  ],
  declarations: [PhongBanComponent]
})
export class PhongBanModule { }
