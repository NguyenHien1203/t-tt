import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Mail } from '../demo/models/mail';
import { Notifi } from '../demo/models/notifi';
import { Clock } from '../demo/models/clock';
import { Profile } from '../demo/models/profile';
import { AuthService } from '../common/auth.services';
import { TopbarService } from './service/app.topbar.service';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private topbarService: TopbarService
    ) {}

    DonVi_NhomQuyen: MenuItem[] = [];
    products: any[] = [];
    items!: MenuItem[];
    mails: Mail[] = [];
    notifis: any[] = [];
    clocks: Clock[] = [];
    profiles: Profile[] = [];
    fullName: string = '';
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    ngOnInit(): void {
        this.LoadDanhMuc();

        this.fullName = this.authService.GetmUserInfo()?.fullName;
        this.mails = [
            { label: 'Nhận thông báo', createdDate: new Date(1901, 10, 10) },
            { label: 'Nhân viên (Bảo vệ)', createdDate: new Date(1901, 1, 10) },
        ];

        this.profiles = [
            {
                label: 'Thông tin tài khoản',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: ['/he-thong/thong-tin-nguoi-dung'],
            },
            {
                label: 'Đổi mật khẩu',
                icon: 'pi pi-fw pi-pencil',
                routerLink: ['/he-thong/doi-mat-khau'],
            },
            {
                label: 'Đăng xuất',
                icon: 'pi pi-fw pi-sign-out',
                routerLink: ['/auth/logout'],
            },
        ];

        // this.notifis = [
        //     { label: 'Notifi', createdDate: new Date(1901, 10, 10) },
        //     {
        //         label: 'Thông báo tiền lương ',
        //         createdDate: new Date(1901, 1, 10),
        //     },
        // ];

        this.clocks = [
            { label: 'Sắp họp', createdDate: new Date(1901, 10, 10) },
            { label: 'Mai họp', createdDate: new Date(1901, 1, 10) },
        ];

        this.DonVi_NhomQuyen = [
            { label: 'Văn thư (CNTT)', icon: '', url: '' },
            { label: 'Nhân viên (Bảo vệ)', icon: '', routerLink: ['/theming'] },
        ];
    }

    public LoadDanhMuc(): void {
        this.topbarService.getDanhSachThongBao().then((data) => {
            this.notifis = data.map((tb) => {
                return {
                    label: tb.tieuDe,
                    createdDate: tb.created,
                };
            });
        });
    }
}
