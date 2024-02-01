import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Mail } from '../demo/models/mail';
import { Notifi } from '../demo/models/notifi';
import { Clock } from '../demo/models/clock';
import { Profile } from '../demo/models/profile';
import { AuthService } from '../common/auth.services';
import { TopbarService } from './service/app.topbar.service';
import { addWeeks, format, startOfWeek } from 'date-fns';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styles: [
        `
            .bold {
                font-weight: bold;
            }
            *.icon-blue {
                color: #0088cc;
            }
            *.icon-grey {
                color: grey;
            }
            i.icon-grey {
                width: 100px;
                text-align: center;
                vertical-align: middle;
                position: relative;
            }
            .badge:after {
                content: var(--content, '');
                position: absolute;
                background: #dd2a2a;
                height: 1.2rem;
                top: 1.2rem;
                right: 1.5rem;
                width: 1.3rem;
                text-align: center;
                line-height: 1.2rem;
                font-size: 0.7rem;
                border-radius: 100%;
                color: white;
                border: 1px solid #dd2a2a;
            }
            .badge-notifi:after {
                content: var(--content, '');
                position: absolute;
                background: #dd2a2a;
                height: 1.2rem;
                top: 2.2rem;
                right: 1.5rem;
                width: 1.3rem;
                text-align: center;
                line-height: 1.2rem;
                font-size: 0.7rem;
                border-radius: 100%;
                color: white;
                border: 1px solid #dd2a2a;
            }
        `,
    ],
})
export class AppTopBarComponent implements OnInit {
    @ViewChild('mailBadge') mailBadge: ElementRef;
    @ViewChild('notifiBadge') notifiBadge: ElementRef;
    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private topbarService: TopbarService,
        private elementRef: ElementRef
    ) {}

    userId: string = this.authService.GetmUserInfo()?.userId ?? '0';
    traoDoiId: string = '1';
    thongBaoId: string = '1';
    nhanCaNhanId: number = 1;
    hienThiChiTietHopThu: boolean = false;
    hienThiChiTietThongBao: boolean = false;
    DonVi_NhomQuyen: MenuItem[] = [];
    products: any[] = [];
    items!: MenuItem[];
    mails: Mail[] = [];
    mailUnread: any[] = [];
    notifis: any[] = [];
    notifiUnread: any[] = [];
    clocks: Clock[] = [];
    profiles: Profile[] = [];
    fullName: string = '';

    ngOnInit(): void {
        this.LoadDanhMuc();

        this.fullName = this.authService.GetmUserInfo()?.fullName;
        this.profiles = [
            {
                label: 'Thông tin tài khoản',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: ['/he-thong/thay-doi-thong-tin'],
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

        this.DonVi_NhomQuyen = [
            { label: 'Văn thư (CNTT)', icon: '', url: '' },
            { label: 'Nhân viên (Bảo vệ)', icon: '', routerLink: ['/theming'] },
        ];
    }

    public async LoadDanhMuc(): Promise<void> {
        try {
            const dataThongBao = await this.topbarService.getDanhSachThongBao(
                this.userId
            );
            this.notifis = dataThongBao.map((tb) => {
                return {
                    label: tb.tieuDe,
                    createdDate: tb.created,
                    trangThaiTBX: tb.trangThaiTBX,
                    idThongBaoXem: tb.idThongBaoXem,
                    id: tb.id,
                };
            });

            const notifiIcon = this.notifiBadge.nativeElement;
            this.notifiUnread = (this.notifis ?? []).filter(
                (dt) => dt.trangThaiTBX == 0
            );
            // Đặt nội dung vào badge:after
            notifiIcon.style.setProperty(
                '--content',
                `"${this.notifiUnread.length}"`
            );

            const dataHopThuDen = await this.topbarService.getDanhSachHopThuDen(
                this.userId
            );
            this.mails = dataHopThuDen.map((tb) => {
                return {
                    traoDoiId: tb.traoDoiId,
                    label: tb.tieuDe,
                    createdDate: tb.created,
                    trangThai: tb.trangThai,
                    id: tb.id,
                };
            });

            const badgeIcon = this.mailBadge.nativeElement;
            this.mailUnread = this.mails.filter((dt) => dt.trangThai == 1);
            // Đặt nội dung vào badge:after
            badgeIcon.style.setProperty(
                '--content',
                `"${this.mailUnread.length}"`
            );

            let currentWeek = this.getWeek(new Date());
            const firstDayOfThisWeek = format(
                this.getFirstDayOfWeek(new Date().getFullYear(), currentWeek),
                'dd/MM/yyyy'
            );

            const dataHoatDongSapToi =
                await this.topbarService.getDanhSachHoatDongSapToi(
                    firstDayOfThisWeek,
                    this.userId
                );

            this.clocks = dataHoatDongSapToi.map((hdst) => {
                return {
                    label: hdst.noiDung,
                    eventDate: hdst.ngayDienRa,
                };
            });
        } catch (error) {
            console.log(error);
        }
    }

    getWeek(date: Date): number {
        const startOfYear = startOfWeek(new Date(date.getFullYear(), 0, 1)); //ngày đầu tiên của năm hiện tại
        const difference = date.getTime() - startOfYear.getTime(); //lấy ra milliseconds giây(js) từ đầu năm đến hiện tại
        const oneWeek = 7 * 24 * 60 * 60 * 1000; //1 tuần có bao nhiêu milis
        return Math.ceil(difference / oneWeek); //chia ra thì ra tương đối số tuần
    }

    getFirstDayOfWeek(year: number, week: number): Date {
        // Tính toán ngày đầu tuần của tuần và năm cụ thể
        const firstDayOfYear = new Date(year, 0, 1); //lấy ngày đầu tuần của năm

        //js quy ước từ 1 đến 53 tuần nhưng chỉ có 52 tuần nên phải -1;
        return addWeeks(firstDayOfYear, week - 1); // + số tuần đã chọn sẽ ra ngày đầu của tuần
    }

    chiTietHopThuDen(
        traoDoiId: string,
        ncn: number,
        idTraoDoiUser: string
    ): void {
        this.topbarService
            .chuyenTrangThaiHopThu(idTraoDoiUser)
            .subscribe((data) => {});
        this.traoDoiId = traoDoiId;
        this.nhanCaNhanId = ncn;
        this.hienThiChiTietHopThu = true;
    }

    chiTietThongBao(thongBaoId: string, idThongBaoXem: string): void {
        this.topbarService
            .chuyenTrangThaiThongBao(idThongBaoXem)
            .subscribe((data) => {});
        this.thongBaoId = thongBaoId;
        this.hienThiChiTietThongBao = true;
    }

    Thoat(itemHt: any, loai: string): void {
        if (loai === 'CTHT') this.hienThiChiTietHopThu = false;
        if (loai === 'TB') this.hienThiChiTietThongBao = false;
    }
}
