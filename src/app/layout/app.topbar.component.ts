import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {
    DonVi_NhomQuyen: MenuItem[] = [];

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }
    ngOnInit(): void {
        this.DonVi_NhomQuyen = [
            { label: 'Văn thư (CNTT)', icon: '', url: '' },
            { label: 'Nhân viên (Bảo vệ)', icon: '', routerLink: ['/theming'] }
        ];
    }
}
