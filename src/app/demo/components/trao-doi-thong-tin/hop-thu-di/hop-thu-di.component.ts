import { ChangeDetectorRef, Component } from '@angular/core';
import { EventClickArg } from '@fullcalendar/core';
import {
    ConfirmationService,
    MenuItem,
    MessageService,
    SelectItem,
} from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { HopThuDiService } from 'src/app/demo/service/trao-doi-thong-tin/hop-thu-di.service';
import { SoanThuService } from 'src/app/demo/service/trao-doi-thong-tin/soan-thu.service';
import { TimKiemDanhSach } from 'src/app/models/trao-doi-thong-tin/hop-thu-di';

@Component({
    selector: 'app-hop-thu-di',
    templateUrl: './hop-thu-di.component.html',
    styleUrls: ['./hop-thu-di.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class HopThuDiComponent {
    constructor(
        private messageService: MessageService,
        private service: HopThuDiService,
        private soanThuService: SoanThuService,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private confirmationService: ConfirmationService
    ) {}

    items = [{ label: 'Trao đổi thông tin' }, { label: 'Hộp thư đi' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    lstNhanCaNhan: any[] = [];
    isMenuVisible = true;
    lstNhanCaNhanClone: any[] = [];
    lstTraoDoi: any[] = [];
    MenuItems = [];
    tieuDe: string = '';
    timChinhXac: boolean = false;
    hienThiChiTiet: boolean = false;
    isShowMenuBar: boolean = false;
    loading: boolean = true;
    isCheckAll: boolean = false;
    public id: string = '1';
    public checkThuDen: number = 0;
    public checkThuNhap: number = 0;
    public ncn: number = 0;
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    idUser: string = this.authService.GetmUserInfo()?.userId ?? '0';
    yearOptions: SelectItem[] = [];
    monthOptions: SelectItem[] = [];
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
            .getDanhSachNhanCaNhan(
                Number(this.authService.GetmUserInfo()?.userId)
            )
            .then((data) => {
                this.lstNhanCaNhan = data.map((ncn) => {
                    //bind menu bar
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
        this.GetDataMOnthYear();
    }

    public LoadDanhSach() {
        this.timKiemDanhSach.timChinhXac = this.timChinhXac ? 1 : 0;
        this.service.getDanhSachHopThuDi(this.timKiemDanhSach).then((data) => {
            this.lstTraoDoi = data;
        });
    }

    public CheckedHt() {
        this.timChinhXac = !this.timChinhXac;
    }

    public CheckSingle(event, idTraoDoi) {
        this.lstTraoDoi = this.lstTraoDoi.map((td) => {
            if (idTraoDoi === td.value) {
                return { ...td, checked: event };
            } else {
                return { ...td };
            }
        });
        this.isCheckAll =
            this.lstTraoDoi.filter((x) => x.checked == true).length ===
            this.lstTraoDoi.length;

        this.isShowMenuBar =
            this.lstTraoDoi.filter((x) => x.checked == true).length > 0;
    }

    public CheckAll(event) {
        this.isCheckAll = event;
        this.lstTraoDoi = this.lstTraoDoi.map((data) => {
            return { ...data, checked: this.isCheckAll };
        });
        this.isShowMenuBar =
            this.lstTraoDoi.filter((x) => x.checked == true).length > 0;
    }

    public GanNhan() {
        const lstHopThuSelected = this.lstTraoDoi
            .filter((x) => x.checked == true)
            .map((x) => x.id);
        const lstNhanSelected = this.lstNhanCaNhanClone
            .filter((x) => x.checked == true)
            .map((x) => x.value);

        if (lstNhanSelected.length == 0) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Yêu cầu chọn nhãn',
            });
        }

        let itemData = {
            listHopThuUser: lstHopThuSelected,
            listNhan: lstNhanSelected,
        };

        this.soanThuService.ganNhan(itemData).subscribe((data) => {
            this.messageService.add({
                severity: data.isError ? 'error' : 'success',
                summary: data.isError ? 'Error' : 'Success',
                detail: data.title,
            });
        });
    }

    public XoaNhieu() {
        const lstHopThuSelected = this.lstTraoDoi
            .filter((x) => x.checked == true)
            .map((x) => x.id);

        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn xác nhận xóa những bản ghi này?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.soanThuService.xoaNhieu(lstHopThuSelected).subscribe(
                    (data) => {
                        if (data.isError) {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: data.title,
                            });
                        } else {
                            this.LoadDanhSach();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: data.title,
                            });
                        }
                    },
                    (error) => {
                        console.log('Error', error);
                    }
                );
            },
            reject: () => {},
        });
    }

    public Xoa(id: string) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn xác nhận xóa bản ghi này?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.soanThuService.xoa(id).subscribe(
                    (data) => {
                        if (data.isError) {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: data.title,
                            });
                        } else {
                            this.LoadDanhSach();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: data.title,
                            });
                        }
                    },
                    (error) => {
                        console.log('Error', error);
                    }
                );
            },
            reject: () => {},
        });
    }

    public DanhDauQuanTrong() {
        const lstHopThuSelected = this.lstTraoDoi
            .filter((x) => x.checked == true)
            .map((x) => x.id);

        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn xác nhận đánh dấu quan trọng?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.soanThuService
                    .danhDauQuanTrong(lstHopThuSelected)
                    .subscribe(
                        (data) => {
                            if (data.isError) {
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: data.title,
                                });
                            } else {
                                this.LoadDanhSach();
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Success',
                                    detail: data.title,
                                });
                            }
                        },
                        (error) => {
                            console.log('Error', error);
                        }
                    );
            },
            reject: () => {},
        });
    }

    public ChiTiet(
        id: string,
        ncn: number,
        checkThuDen: number,
        checkThuNhap: number
    ): void {
        this.id = id;
        this.checkThuDen = checkThuDen;
        this.checkThuNhap = checkThuNhap;
        this.ncn = ncn;
        this.hienThiChiTiet = true;
    }

    public Thoat(itemHt: any, loai: string): void {
        this.hienThiChiTiet = false;
    }
}
