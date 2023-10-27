import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Mail } from '../demo/models/mail';
import { Notifi } from '../demo/models/notifi';
import { Clock } from '../demo/models/clock';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {
    DonVi_NhomQuyen: MenuItem[] = [];
    products: any[] = [];
    items!: MenuItem[];
    mails: Mail[] = [];
    notifis: Notifi[] = [];
    clocks: Clock[] = [];
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }
    ngOnInit(): void {
        
        this.mails = [
            { label: 'Nhận thông báo', createdDate: new Date(1901,10,10) },
            { label: 'Nhân viên (Bảo vệ)', createdDate: new Date(1901,1,10) }
        ];

        this.notifis = [
            { label: 'Notifi', createdDate: new Date(1901,10,10) },
            { label: 'Thông báo tiền lương ', createdDate: new Date(1901,1,10) }
        ];

        this.clocks = [
            { label: 'Sắp họp', createdDate: new Date(1901,10,10) },
            { label: 'Mai họp', createdDate: new Date(1901,1,10) }
        ];

        this.DonVi_NhomQuyen = [
            { label: 'Văn thư (CNTT)', icon: '', url: '' },
            { label: 'Nhân viên (Bảo vệ)', icon: '', routerLink: ['/theming'] }
        ];
    }
}

