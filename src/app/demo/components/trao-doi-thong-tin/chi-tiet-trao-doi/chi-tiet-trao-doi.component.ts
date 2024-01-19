import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { SoanThuService } from 'src/app/demo/service/trao-doi-thong-tin/soan-thu.service';
import { TimKiemDanhSachTraoDoi } from 'src/app/models/trao-doi-thong-tin/chi-tiet-trao-doi';

@Component({
    selector: 'app-chi-tiet-trao-doi',
    templateUrl: './chi-tiet-trao-doi.component.html',
    styleUrls: ['./chi-tiet-trao-doi.component.scss'],
    providers: [MessageService],
})
export class ChiTietTraoDoiComponent {
    constructor(
        private messageService: MessageService,
        private service: SoanThuService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {}

    MenuItems = [];
    lstNhanCaNhan: any[] = [];
    lstNhanCaNhanClone: any[] = [];
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    loading: boolean = false;
    lstChiTietTraoDoi: any[] = [];
    lstTrangThai: any[] = [
        { text: 'Tất cả', value: 0 },
        { text: 'Chưa xem', value: 1 },
        { text: 'Đã xem', value: 2 },
    ];
    items = [{ label: 'Trao đổi thông tin' }, { label: 'Chi tiết trao đổi' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    timKiemDanhSach: TimKiemDanhSachTraoDoi = {
        traoDoiId: 0,
        trangThai: 0,
        tenDangNhap: '',
    };

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    async ngOnInit() {
        try {
            this.loading = false;
            await this.service
                .getDanhSachNhanCaNhan(
                    Number(this.authService.GetmUserInfo()?.userId)
                )
                .then((data) => {
                    this.lstNhanCaNhan = data.map((ncn) => {
                        return {
                            label: ncn.tenNhan,
                            icon: 'pi pi-tag',
                            routerLink: [
                                '/trao-doi-thong-tin/hop-thu-ca-nhan',
                                { ncn: ncn.id },
                            ],
                        };
                    });

                    this.lstNhanCaNhanClone = data.map((ncn) => {
                        //tạo button gán nhãn
                        return {
                            label: ncn.tenNhan,
                            value: ncn.id,
                            checked: false,
                        };
                    });
                });

            this.MenuItems = [
                {
                    label: 'Soạn thư',
                    icon: 'pi pi-file-edit',
                    routerLink: ['/trao-doi-thong-tin/soan-thu'],
                },
                {
                    label: 'Hộp thư đến',
                    icon: 'pi pi-envelope',
                    routerLink: ['/trao-doi-thong-tin/hop-thu-den'],
                },
                {
                    label: 'Hộp thư đi',
                    icon: 'pi pi-send',
                    routerLink: ['/trao-doi-thong-tin/hop-thu-di'],
                },
                {
                    label: 'Thư nháp',
                    icon: 'pi pi-clone',
                    routerLink: ['/trao-doi-thong-tin/hop-thu-nhap'],
                },
                {
                    label: 'Thư quan trọng',
                    icon: 'pi pi-flag-fill',
                    routerLink: ['/trao-doi-thong-tin/hop-thu-quan-trong'],
                },
                {
                    label: 'Nhãn trao đổi cá nhân',
                    icon: 'pi pi-tags',
                    items: this.lstNhanCaNhan,
                },
            ];

            this.LoadDanhSach();
        } catch (error) {
            console.log(error);
        }
    }

    public LoadDanhSach(): void {
        this.route.params.subscribe((params) => {
            this.timKiemDanhSach.traoDoiId = params['traoDoiId'];
        });
        this.service
            .getDanhSachChiTietTraoDoi(this.timKiemDanhSach)
            .then((data) => {
                this.lstChiTietTraoDoi = data;
            });
    }
}
