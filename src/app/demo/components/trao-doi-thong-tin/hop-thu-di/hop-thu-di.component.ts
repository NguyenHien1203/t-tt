import { ChangeDetectorRef, Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { HopThuDiService } from 'src/app/demo/service/trao-doi-thong-tin/hop-thu-di.service';
import { SoanThuService } from 'src/app/demo/service/trao-doi-thong-tin/soan-thu.service';
import { TimKiemDanhSach } from 'src/app/models/trao-doi-thong-tin/hop-thu-di';

@Component({
    selector: 'app-hop-thu-di',
    templateUrl: './hop-thu-di.component.html',
    styleUrls: ['./hop-thu-di.component.scss'],
    providers: [MessageService],
})
export class HopThuDiComponent {
    constructor(
        private messageService: MessageService,
        private service: HopThuDiService,
        private soanThuService: SoanThuService,
        private authService: AuthService,
        private cd: ChangeDetectorRef
    ) {}

    items = [{ label: 'Trao đổi thông tin' }, { label: 'Hộp thư đi' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    lstNhanCaNhan: any[] = [];
    lstTraoDoi: any[] = [];
    MenuItems = [];
    tieuDe: string = '';
    timChinhXac: boolean = false;
    hienThiChiTiet: boolean = false;
    loading: boolean = true;
    isCheckAll: boolean = false;
    public id: string = '1';
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    yearOptions: SelectItem[] = [];
    monthOptions: SelectItem[] = [];
    timKiemDanhSachNhanCaNhan: any = {
        tenNhan: '',
        phanLoai: '1',
        ghiChu: '',
        nguoiTao: Number(this.authService.GetmUserInfo()?.userId),
        timChinhXac: 0,
    };

    timKiemDanhSach: TimKiemDanhSach = {
        idUserNhan: this.idUser,
        idNhanCaNhan: 10, //nhãn đi
        nam: 0,
        thang: 0,
        tieuDe: '',
        noiDung: '',
        nguoiGui: '',
        nguoiNhan: '',
        checkQuanTrong: 0,
        timChinhXac: 0,
    };

    public GetDataMOnthYear() {
        const currentYear = new Date().getFullYear();
        for (let i = currentYear + 1; i >= currentYear - 5; i--) {
            this.yearOptions.push({ label: 'Năm ' + i.toString(), value: i });
        }

        for (let i = 1; i <= 12; i++) {
            this.monthOptions.push({
                label: 'Tháng ' + i.toString(),
                value: i,
            });
        }
    }

    async ngOnInit() {
        this.loading = false;
        await this.soanThuService
            .getDanhSachNhanCaNhan(this.timKiemDanhSachNhanCaNhan)
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

        this.LoadDanhSach();
        this.GetDataMOnthYear();
    }

    public LoadDanhSach() {
        this.service.getDanhSachHopThuDi(this.timKiemDanhSach).then((data) => {
            this.lstTraoDoi = data;
        });
    }

    public CheckedHt() {}

    public CheckSingle(event, idTraoDoi) {
        this.lstTraoDoi = this.lstTraoDoi.map((td) => {
            if (idTraoDoi === td.value) {
                return { ...td, check: event };
            } else {
                return { ...td };
            }
        });
        this.isCheckAll =
            this.lstTraoDoi.filter((x) => x.check == true).length ===
            this.lstTraoDoi.length;
    }
    public CheckAll(event) {
        this.isCheckAll = event;
        this.lstTraoDoi = this.lstTraoDoi.map((data) => {
            return { ...data, checked: this.isCheckAll };
        });
    }

    public GanNhan() {}

    public XoaNhieu() {}

    public DanhDauQuanTrong() {}

    public Thoat(itemHt: any, loai: string): void {
        if (loai === 'C') this.hienThiChiTiet = false;
    }
}
