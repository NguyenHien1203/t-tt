import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { first } from 'rxjs';
import { AuthService } from 'src/app/common/auth.services';
import { SoVanBanDiService } from 'src/app/demo/service/van-ban-di/so-van-ban-di.service';
import { TimKiemDanhSach } from 'src/app/models/van-ban-di/so-van-ban-di';

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

    timKiemDanhSach: TimKiemDanhSach = {
        loaiTrichXuat: 0,
        nam: new Date().getFullYear(),
        thang: 0,
        quy: 0,
        soVanBanId: 0,
        loaiVanBanId: 0,
        bHTN: '1901-01-01',
        bHDN: '1901-01-01',
        bGTN: '1901-01-01',
        bGDN: '1901-01-01',
        DonViId: 0,
        first: 0,
        rowsPerPage: 10,
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

        for (let i = 1; i >= 12; i++) {
            this.monthOptions.push({
                label: 'Tháng ' + i.toString(),
                value: i,
            });
        }

        for (let i = 1; i >= 4; i++) {
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
        this.LoadDanhSach();
    }

    public ExportExcel() {
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

    public In(): void {
      let listInSoVanBan = this.lstSoVanBanDi.slice(this.timKiemDanhSach.first, this.timKiemDanhSach.rowsPerPage)
        const encodedList = encodeURIComponent(JSON.stringify(listInSoVanBan));
        this.router.navigate(['./van-ban-di/so-van-ban-di/in-so-van-ban'], {
            queryParams: { list: encodedList },
            queryParamsHandling: 'merge',
            state: { target: '_blank' }, // Sử dụng state để truyền 'target'
        });
    }

    public ExportWord() {
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
}
