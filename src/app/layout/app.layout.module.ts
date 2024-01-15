import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppLayoutComponent } from "./app.layout.component";
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { ChiTietHopThuModule } from '../demo/components/trao-doi-thong-tin/chi-tiet-hop-thu/chi-tiet-hop-thu.module';
import { ChiTietModule } from '../demo/components/thong-tin-khac/xem-thong-bao/chi-tiet/chi-tiet.module';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
    ],
    imports: [
        BadgeModule, 
        TableModule,
        OverlayPanelModule,
        DropdownModule,
        DialogModule,
        SplitButtonModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        MenuModule,
        ChiTietHopThuModule,
        ChiTietModule,//chi tiết thông báo
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
