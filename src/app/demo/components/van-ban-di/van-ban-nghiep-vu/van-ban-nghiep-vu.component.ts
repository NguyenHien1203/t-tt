import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/common/auth.services';
import { VanBanNghiepVuService } from 'src/app/demo/service/van-ban-di/van-ban-nghiep-vu.service';
import { TimKiemDanhSach } from 'src/app/models/van-ban-di/van-ban-nghiep-vu';

@Component({
    selector: 'app-van-ban-nghiep-vu',
    templateUrl: './van-ban-nghiep-vu.component.html',
    styleUrls: ['./van-ban-nghiep-vu.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class VanBanNghiepVuComponent {
    constructor(
        private messageService: MessageService,
        private service: VanBanNghiepVuService,
        private authService: AuthService,
        private confirmService: ConfirmationService,
        private cd: ChangeDetectorRef,
        private router: Router
    ) {}

    strTrichXuat: string = '';
    activeTab: string = 'vbThuHoi';
    activeTabItem: string = '';
    idDonViLamViec: string = this.authService.GetDonViLamViec() ?? '0';
    yearOptions: SelectItem[] = [];
    monthOptions: SelectItem[] = [];
    loading: boolean = false;
    timChinhXac: boolean = false;
    lstLoaiVanBan: any = [];
    lstSoVanBanDi: any = [];
    lstSoVanBan: any = [];
    items = [{ label: 'Văn bản đi' }, { label: 'Văn bản nghiệp vụ' }];
    home = { icon: 'pi pi-home', routerLink: '/' };
    lstMucDoKhan: any[] = [
        { text: 'VB thường', value: '1' },
        { text: 'VB khẩn, hỏa tốc', value: '2' },
        { text: 'VB mật', value: '3' },
        { text: 'VB tuyệt mật', value: '4' },
        { text: 'VB tối mật', value: '5' },
    ];
    lstTrichXuat: any[] = [
        {
            label: 'VĂN BẢN THU HỒI',
            command: () => this.showTab('vbThuHoi'),
        },
        {
            label: 'VĂN BẢN CẬP NHẬT',
            command: () => this.showTab('vbCapNhat'),
        },
        {
            label: 'VĂN BẢN THAY THẾ',
            command: () => this.showTab('vbThayThe'),
        },
        {
            label: 'VĂN BẢN LẤY LẠI',
            command: () => this.showTab('vbLayLai'),
        },
    ];

    timKiemDanhSach: TimKiemDanhSach = {
        keyWord: '',
        soVanBanId: 0,
        vanBanId: 0,
        donViId: Number(this.idDonViLamViec),
        mucDo: 0,
        loaiVanBanId: 0,
        lanhDaoKy: '',
        ngayGuiVanBan: '1901-01-01',
        ngayBanHanhVanBan: '1901-01-01',
        nam: new Date().getFullYear(),
        thang: 0,
        trangThai: 0,
        soKyHieu: '',
        lanhDaoKyId: 0,
        soDi: 0,
        trichYeu: '',
        timChinhXac: 0,
    };

    ngOnInit(): void {
        this.activeTabItem = this.lstTrichXuat[0];
        this.GetDataMonthYear();
        this.loading = false;
        this.LoadDanhSach();
    }

    showTab(tabId: string): void {
        this.activeTab = tabId;
        if (tabId == 'vbThuHoi') this.timKiemDanhSach.trangThai = 24; //đây là các trạng thái cố định của văn bản
        if (tabId == 'vbCapNhat') this.timKiemDanhSach.trangThai = 17;
        if (tabId == 'vbThayThe') this.timKiemDanhSach.trangThai = 15;
        if (tabId == 'vbLayLai') this.timKiemDanhSach.trangThai = 18;
        this.LoadDanhSach();
    }

    ngAfterContentChecked(): void {
        this.cd.detectChanges();
    }

    public GetDataMonthYear() {
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

    public LoadDanhSach(): void {
        this.service
            .getDanhSachVanBanDiNghiepVu(this.timKiemDanhSach)
            .then((data) => {
                this.lstSoVanBanDi = data;
            });
    }

    public Thoat(itemHt: any, loai: string): void {
        this.LoadDanhSach();
    }

    public CheckedHt(): void {
        this.timChinhXac = !this.timChinhXac;
    }

    formatDateToDDMMYY(date): string {
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear().toString();

        return day + '/' + month + '/' + year;
    }
}
