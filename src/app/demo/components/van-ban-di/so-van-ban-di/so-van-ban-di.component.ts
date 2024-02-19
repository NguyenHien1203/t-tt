import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { SoVanBanDiService } from 'src/app/demo/service/van-ban-di/so-van-ban-di.service';
import { TimKiemDanhSachSoVanBanDi } from 'src/app/models/van-ban-di/so-van-ban-di';

@Component({
    selector: 'app-so-van-ban-di',
    templateUrl: './so-van-ban-di.component.html',
    styleUrls: ['./so-van-ban-di.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class SoVanBanDiComponent {
    constructor(
        private messageService: MessageService,
        private service: SoVanBanDiService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private cd: ChangeDetectorRef,
        private router: Router
    ) {}

    id: string = '1';
    hienThiChiTiet: boolean = false;
    strTrichXuat: string = '';
    activeTab: string = 'txThang';
    activeTabItem: string = '';
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    yearOptions: SelectItem[] = [];
    monthOptions: SelectItem[] = [];
    quarterOptions: SelectItem[] = [];
    loading: boolean = false;
    lstLoaiVanBan: any = [];
    lstSoVanBanDi: any = [];
    lstSoVanBan: any = [];
    items = [{ label: 'Văn bản đi' }, { label: 'Sổ văn bản đi' }];
    home = { icon: 'pi pi-home', routerLink: '/' };

    lstTrichXuat: any[] = [
        {
            label: 'Trích xuất theo tháng',
            icon: 'pi pi-fw pi-calendar',
            command: () => this.showTab('txThang', 1),
        },
        {
            label: 'Trích xuất theo quý',
            icon: 'pi pi-fw pi-calendar',
            command: () => this.showTab('txQuy', 2),
        },
        {
            label: 'Trích xuất theo năm',
            icon: 'pi pi-fw pi-calendar',
            command: () => this.showTab('txNam', 3),
        },
        {
            label: 'Trích xuất theo ngày',
            icon: 'pi pi-fw pi-calendar',
            command: () => this.showTab('txNgay', 4),
        },
    ];

    timKiemDanhSach: TimKiemDanhSachSoVanBanDi = {
        loaiTrichXuat: 1,
        nam: new Date().getFullYear(),
        thang: 0,
        quy: 0,
        soVanBanId: 0,
        loaiVanBanId: 0,
        bHTN: '1901-01-01',
        bHDN: '1901-01-01',
        bGTN: '1901-01-01',
        bGDN: '1901-01-01',
        donViId: Number(this.idDonViLamViec),
    };

    ngOnInit(): void {
        this.activeTabItem = this.lstTrichXuat[0];
        this.GetDataMonthQuarterYear();
        this.loading = false;
        this.LoadDanhSach();
        this.LoadSoVanBan();
    }

    showTab(tabId: string, loaiTrichXuat: number): void {
        this.activeTab = tabId;
        this.timKiemDanhSach.loaiTrichXuat = loaiTrichXuat;
    }

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    public LoadSoVanBan() {
        this.service.getSoVanBan(this.idDonViLamViec).then((data) => {
            this.lstSoVanBan = data;
        });
    }

    public changeSoVanBan(event) {
        this.lstLoaiVanBan = [];
        if (event != null) {
            this.lstLoaiVanBan = this.service
                .changeSoVanBan(event, this.idDonViLamViec)
                .then((data) => {
                    this.lstLoaiVanBan = data;
                });
        }
    }

    public GetDataMonthQuarterYear() {
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

        for (let i = 1; i <= 4; i++) {
            this.quarterOptions.push({
                label: 'Quý ' + i.toString(),
                value: i,
            });
        }
    }

    public LoadDanhSach(): void {
        this.service
            .getDanhSachSoVanBanDi(this.timKiemDanhSach)
            .then((data) => {
                this.lstSoVanBanDi = data;
            });
    }

    onPaginatorChange(event: any) {
        this.timKiemDanhSach.first = event.first;
        this.timKiemDanhSach.rowsPerPage = event.rows;
    }

    public Thoat(itemHt: any, loai: string): void {
        if (loai == 'CT') this.hienThiChiTiet = false;
        this.LoadDanhSach();
    }

    public ExportExcel() {
        this.LoadDanhSach();
        this.confirmService.confirm({
            message: 'Bạn có chắc chắn xác nhận xuất excel',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.service.exportExcel(this.timKiemDanhSach).subscribe(
                    (data: ArrayBuffer) => {
                        const blob = new Blob([data], {
                            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        });

                        const downloadUrl = URL.createObjectURL(blob);

                        const a = document.createElement('a');
                        a.href = downloadUrl;
                        a.download = 'SoVanBanDi.xlsx';
                        document.body.appendChild(a);
                        a.click();

                        document.body.removeChild(a);
                        URL.revokeObjectURL(downloadUrl);
                    },
                    (error) => {
                        console.error('Error downloading file:', error);
                    }
                );
            },
            reject: () => {},
        });
    }

    public async In() {
        try {
            await this.service // phải thực hiện cùng lúc tác vụ search + in
                .getDanhSachSoVanBanDi(this.timKiemDanhSach)
                .then((data) => {
                    this.lstSoVanBanDi = data;
                });

            if (this.timKiemDanhSach.loaiTrichXuat == 1) {
                const thang = this.timKiemDanhSach.thang
                    ? 'Tháng ' + this.timKiemDanhSach.thang
                    : '';
                const nam = this.timKiemDanhSach.nam
                    ? ' Năm ' + this.timKiemDanhSach.nam
                    : '';
                this.strTrichXuat = thang + nam;
            }

            if (this.timKiemDanhSach.loaiTrichXuat == 2) {
                const quy = this.timKiemDanhSach.quy
                    ? 'Quý ' + this.timKiemDanhSach.quy
                    : '';
                const nam = this.timKiemDanhSach.nam
                    ? ' Năm ' + this.timKiemDanhSach.nam
                    : '';
                this.strTrichXuat = quy + nam;
            }

            if (this.timKiemDanhSach.loaiTrichXuat == 3) {
                const nam = this.timKiemDanhSach.nam
                    ? ' Năm ' + this.timKiemDanhSach.nam
                    : '';
                this.strTrichXuat = nam;
            }

            if (this.timKiemDanhSach.loaiTrichXuat == 4) {
                const banHanhTu =
                    this.formatDateToDDMMYY(
                        new Date(this.timKiemDanhSach.bHTN)
                    ) != '01/01/1901'
                        ? this.formatDateToDDMMYY(
                              new Date(this.timKiemDanhSach.bHTN)
                          )
                        : '';
                const banHanhDen =
                    this.formatDateToDDMMYY(
                        new Date(this.timKiemDanhSach.bHDN)
                    ) != '01/01/1901'
                        ? ' - ' +
                          this.formatDateToDDMMYY(
                              new Date(this.timKiemDanhSach.bHDN)
                          )
                        : '';
                this.strTrichXuat = banHanhTu + banHanhDen;
            }

            let listInSoVanBan = this.lstSoVanBanDi.slice(
                this.timKiemDanhSach.first,
                this.timKiemDanhSach.rowsPerPage
            );
            const encodedList = encodeURIComponent(
                JSON.stringify(listInSoVanBan)
            );

            // const encodedData = btoa(JSON.stringify(listInSoVanBan));
            await this.router.navigate(['/in-so-van-ban'], {
                queryParamsHandling: 'merge',
                queryParams: {
                    list: encodedList,
                    strTrichXuat: this.strTrichXuat,
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    public ExportWord() {
        this.LoadDanhSach();
        this.confirmService.confirm({
            message: 'Bạn có chắc chắn xác nhận xuất word',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.service.exportWord(this.timKiemDanhSach).subscribe(
                    (data: ArrayBuffer) => {
                        const blob = new Blob([data], {
                            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        });

                        const downloadUrl = URL.createObjectURL(blob);

                        const a = document.createElement('a');
                        a.href = downloadUrl;
                        a.download = 'SoVanBanDi.doc';
                        document.body.appendChild(a);
                        a.click();

                        document.body.removeChild(a);
                        URL.revokeObjectURL(downloadUrl);
                    },
                    (error) => {
                        console.error('Error downloading file:', error);
                    }
                );
            },
            reject: () => {},
        });
    }

    public ChiTiet(id: string) {
        this.id = id;
        this.hienThiChiTiet = true;
    }

    formatDateToDDMMYY(date): string {
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear().toString();

        return day + '/' + month + '/' + year;
    }
}
