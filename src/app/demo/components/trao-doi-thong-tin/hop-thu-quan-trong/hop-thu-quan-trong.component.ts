import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { SoanThuService } from 'src/app/demo/service/trao-doi-thong-tin/soan-thu.service';

@Component({
    selector: 'app-hop-thu-quan-trong',
    templateUrl: './hop-thu-quan-trong.component.html',
    styleUrls: ['./hop-thu-quan-trong.component.scss'],
    providers: [MessageService],
})
export class HopThuQuanTrongComponent {
    items = [{ label: 'Trao đổi thông tin' }, { label: 'Soạn thư' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    lstNhanCaNhan: any[] = [];
    MenuItems = [];
    timChinhXac: boolean = false;
    public id: string = '1';
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    constructor(
        private messageService: MessageService,
        private soanThuService: SoanThuService,
        private service: SoanThuService,
        private authService: AuthService,
        private cd: ChangeDetectorRef
    ) {}

    timKiemDanhSach: any = {
        tenNhan: '',
        phanLoai: '1',
        ghiChu: '',
        nguoiTao: Number(this.authService.GetmUserInfo()?.userId),
        timChinhXac: 0,
    };

    async ngOnInit() {
        await this.soanThuService
            .getDanhSachNhanCaNhan(this.timKiemDanhSach)
            .then((data) => {
                this.lstNhanCaNhan = data.map((ncn) => {
                    return {
                        label: ncn.tenNhan,
                        icon: 'pi pi-tag',
                        routerLink: [
                            '/trao-doi-thong-tin/hop-thu-ca-nhan',
                            { id: ncn.id },
                        ],
                    };
                });
            });
        console.log(this.lstNhanCaNhan);

        this.MenuItems = [
            {
                label: 'Soạn thư',
                icon: 'pi pi-file-edit',
                routerLink: ['/trao-doi-thong-tin/soan-thu'],
            },
            {
                label: 'Hộp thư đến',
                icon: 'pi pi-inbox',
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
    }
}